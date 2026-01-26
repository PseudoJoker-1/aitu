'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Image from 'next/image'
import { FadeUp } from '@/components/ui/fade-up'
import logo from '@/img/logo.png'
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
                            loop
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
        <>
            <HeroHeader />
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
                                            <Link href="#link">
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
        </>
    )
}

const menuItems = [
    { name: 'Услуги', href: '#services' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contacts' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <header className="fixed top-5 left-0 right-0 z-50 w-full pointer-events-none">
            <motion.nav
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isMounted ? 1 : 0, y: isMounted ? 0 : -20 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="pointer-events-auto mx-auto max-w-[1200px] px-6"
            >
                <div
                    className="relative flex items-center justify-between gap-6 py-0 px-6 rounded-full border shadow-lg"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.4)',
                        backdropFilter: 'blur(20px) saturate(180%)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        borderColor: 'rgba(255, 255, 255, 0.3)',
                        borderWidth: '1px',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)'
                    }}
                >
                    {/* Logo */}
                    <Link
                        href="/"
                        aria-label="home"
                        className="flex items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Logo />
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-8">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className="relative text-sm font-semibold text-gray-900 transition-opacity duration-200 hover:opacity-70 group"
                                    >
                                        <span>{item.name}</span>
                                        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Button
                            asChild
                            className="h-10 px-6 rounded-full bg-black text-white font-semibold text-sm hover:bg-gray-900 transition-colors duration-200"
                        >
                            <Link href="#contact">
                                Обсудить проект
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuState(!menuState)}
                        aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                        className="lg:hidden relative z-20 p-2 cursor-pointer"
                    >
                        <Menu className={cn("size-5 text-gray-900 transition-all duration-200", menuState && "opacity-0 scale-0")} />
                        <X className={cn("absolute inset-0 m-auto size-5 text-gray-900 transition-all duration-200", !menuState && "opacity-0 scale-0 rotate-90")} />
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {menuState && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="lg:hidden mt-3 rounded-2xl border overflow-hidden shadow-lg"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(20px) saturate(180%)',
                                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                                borderColor: 'rgba(255, 255, 255, 0.3)',
                                borderWidth: '1px',
                                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)'
                            }}
                        >
                            <ul className="py-4 px-6 space-y-4">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setMenuState(false)}
                                            className="block text-sm font-semibold text-gray-900 transition-opacity duration-200 hover:opacity-70 py-2"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                                <li className="pt-2 border-t border-gray-200">
                                    <Button
                                        asChild
                                        className="w-full h-10 rounded-full bg-black text-white font-semibold text-sm hover:bg-gray-900 transition-colors duration-200"
                                    >
                                        <Link href="#contact" onClick={() => setMenuState(false)}>
                                            Обсудить проект
                                        </Link>
                                    </Button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    )
}

const Logo = ({ className }: { className?: string }) => {
    return (
        <Image
            src={logo}
            alt="Logo"
            width={1000}
            height={100}
            className={cn("w-36 h-20", className)}
        />
    )
}
