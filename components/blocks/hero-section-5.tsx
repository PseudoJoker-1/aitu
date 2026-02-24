'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { FadeUp } from '@/components/ui/fade-up'
import akimatLogo from '@/img/Akimat.png'
import gormolzavodLogo from '@/img/Gormolzavod.jpg'
import haileyburyLogo from '@/img/Haileybury.png'
import jacLogo from '@/img/JAC.png'
import kiaLogo from '@/img/KIA.png'
import kompasLogo from '@/img/KOMPAS.png'
import mceLogo from '@/img/MCE.png'
import olympLogo from '@/img/OLYMP.png'
import allurLogo from '@/img/allur.png'
import roxLogo from '@/img/rox.png'

const COMPANY_LOGOS = [
    { src: akimatLogo, alt: 'Akimat' },
    { src: gormolzavodLogo, alt: 'Gormolzavod' },
    { src: haileyburyLogo, alt: 'Haileybury' },
    { src: jacLogo, alt: 'JAC' },
    { src: kiaLogo, alt: 'KIA' },
    { src: kompasLogo, alt: 'KOMPAS' },
    { src: mceLogo, alt: 'MCE' },
    { src: olympLogo, alt: 'OLYMP' },
    { src: allurLogo, alt: 'Allur' },
    { src: roxLogo, alt: 'Rox' },
]

const VIDEO_SOURCES = [
    '/vid1.mp4',
    '/vid2.mp4',
    '/vid3.mp4',
]

const VideoBackground = () => {
    const [currentVideoIndex, setCurrentVideoIndex] = React.useState<number>(0)
    const [isInitialized, setIsInitialized] = React.useState(false)
    const videoRef = React.useRef<HTMLVideoElement>(null)

    // Random starting video on mount
    React.useEffect(() => {
        const randomIndex = Math.floor(Math.random() * VIDEO_SOURCES.length)
        setCurrentVideoIndex(randomIndex)
        setIsInitialized(true)
    }, [])

    // Ensure video plays when it loads
    React.useEffect(() => {
        const video = videoRef.current
        if (video && isInitialized) {
            video.play().catch(() => {
                // Auto-play was prevented, which is fine
            })
        }
    }, [currentVideoIndex, isInitialized])

    // Handle video end and transition to next
    const handleVideoEnd = React.useCallback(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % VIDEO_SOURCES.length)
    }, [])

    const currentVideo = VIDEO_SOURCES[currentVideoIndex]

    return (
        <div className="relative w-full max-w-[1280px] mx-auto aspect-[9/10] md:aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl shadow-black/20">
            {/* Dark gradient overlay from bottom to top */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 40%, transparent 100%)'
                }}
            />

            {isInitialized && (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentVideoIndex}
                        className="absolute inset-0 w-full h-full"
                        initial={{
                            opacity: 0,
                            filter: 'blur(8px)'
                        }}
                        animate={{
                            opacity: 1,
                            filter: 'blur(0px)'
                        }}
                        exit={{
                            opacity: 0,
                            filter: 'blur(8px)',
                            transition: { duration: 1.5 }
                        }}
                        transition={{
                            duration: 1.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <motion.video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            preload="auto"
                            src={currentVideo}
                            className="absolute inset-0 w-full h-full object-cover origin-center"
                            onEnded={handleVideoEnd}
                            onLoadedMetadata={(e) => {
                                if (VIDEO_SOURCES[currentVideoIndex].includes('сд 27 07 (1).mp4')) {
                                    e.currentTarget.currentTime = 40
                                }
                            }}
                        />
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    )
}

export function HeroSection() {
    return (
        <main className="overflow-x-hidden">
            <section className="relative overflow-hidden bg-white">
                <div className="pt-32 md:pt-16 lg:pt-20 pb-0">
                    <div className="relative mx-auto max-w-[1280px] px-6">
                        {/* Video Container */}
                        <div className="relative">
                            <VideoBackground />

                            {/* Text Content - Bottom Left */}
                            <div className="absolute bottom-0 left-0 z-20 p-8 md:p-10 lg:p-12">
                                <FadeUp className="max-w-2xl text-balance text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
                                    Создаем незабываемые события
                                </FadeUp>

                                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-12 rounded-full pl-5 pr-3 text-base shadow-lg"
                                        style={{
                                            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <Link href="/#directions">
                                            <span className="text-nowrap">Наши услуги</span>
                                            <ChevronRight className="ml-1" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-background pt-8 pb-8">
                <div className="mx-auto max-w-7xl px-6">
                    <div className="flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                            className="text-[12px] uppercase font-semibold tracking-[0.2em] text-[#888888] mb-10"
                        >
                            НАМ ДОВЕРЯЮТ
                        </motion.p>

                        <div className="relative py-6 w-full">
                            <InfiniteSlider
                                durationOnHover={20}
                                duration={40}
                                gap={112}>
                                {COMPANY_LOGOS.map((logo, index) => (
                                    <div key={index} className="flex items-center justify-center md:grayscale hover:grayscale-0 transition-all duration-300 opacity-100 md:opacity-70 hover:opacity-100">
                                        <Image
                                            className="mx-auto h-12 w-auto object-contain"
                                            src={logo.src}
                                            alt={logo.alt}
                                            height={48}
                                            width={100}
                                            priority
                                        />
                                    </div>
                                ))}
                            </InfiniteSlider>

                            <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20 z-10"></div>
                            <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20 z-10"></div>
                            <ProgressiveBlur
                                className="pointer-events-none absolute left-0 top-0 h-full w-20 z-20"
                                direction="left"
                                blurIntensity={1}
                            />
                            <ProgressiveBlur
                                className="pointer-events-none absolute right-0 top-0 h-full w-20 z-20"
                                direction="right"
                                blurIntensity={1}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
