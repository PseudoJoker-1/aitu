"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { FadeUp } from "@/components/ui/fade-up"
import { services } from "@/src/data"

export function ServicesSection() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(1)
    const [progress, setProgress] = React.useState(0)

    const AUTOPLAY_DURATION = 10000 // 10 seconds

    // 1. Sync active dot with carousel state
    React.useEffect(() => {
        if (!api) return

        const updateState = () => {
            const snapIndex = api.selectedScrollSnap()
            // Map tripled items (e.g. 0-14) back to 0-4
            const realIndex = ((snapIndex % services.length) + services.length) % services.length
            setCurrent(realIndex + 1)
        }

        api.on("select", updateState)
        api.on("reInit", updateState)

        // Initial sync
        updateState()

        return () => {
            api.off("select", updateState)
            api.off("reInit", updateState)
        }
    }, [api])

    // 2. Autoplay Animation - Restarts whenever 'current' (slide) changes
    React.useEffect(() => {
        if (!api) return

        let startTime = Date.now()
        let rafId: number

        const update = () => {
            const now = Date.now()
            const elapsed = now - startTime
            const newProgress = Math.min((elapsed / AUTOPLAY_DURATION) * 100, 100)

            setProgress(newProgress)

            if (elapsed >= AUTOPLAY_DURATION) {
                api.scrollNext()
                // startTime will reset because 'current' will change and trigger this effect to restart
            } else {
                rafId = requestAnimationFrame(update)
            }
        }

        // Reset progress visually when a new slide is selected
        setProgress(0)
        rafId = requestAnimationFrame(update)

        return () => {
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [api, current])

    return (
        <section id="directions" className="w-full bg-white py-16 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-16 gap-6">
                    <FadeUp>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold text-black tracking-tight max-w-xl">
                            Наши направления
                        </h2>
                    </FadeUp>

                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
                            onClick={() => api?.scrollPrev()}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Previous slide</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
                            onClick={() => api?.scrollNext()}
                        >
                            <ArrowRight className="h-5 w-5" />
                            <span className="sr-only">Next slide</span>
                        </Button>
                    </div>
                </div>

                <Carousel
                    setApi={setApi}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-6">
                        {/* Triple items for stable looping on all resolutions */}
                        {[...services, ...services, ...services].map((service, index) => (
                            <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                                <div className="relative group overflow-hidden rounded-[24px] aspect-[3/4] cursor-pointer">
                                    {/* Background Image with Overlay */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
                                    </div>

                                    {/* Content */}
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                        <h3 className="text-2xl font-bold text-white leading-tight">
                                            {service.title}
                                        </h3>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Progress Indicators - Always 5 dots for better UX */}
                <div className="flex justify-center gap-3 mt-12">
                    {services.map((_, index) => (
                        <div
                            key={index}
                            className="h-2 w-16 bg-gray-200 rounded-[10px] overflow-hidden"
                        >
                            <div
                                className="h-full bg-black rounded-[10px]"
                                style={{
                                    width: index === current - 1 ? `${progress}%` : '0%',
                                    transition: index === current - 1 ? 'none' : 'width 0.3s ease'
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
