'use client'
import React, { useRef, useState } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/ui/fade-up'

const EVENT_TYPES = [
    "Корпоратив",
    "Конференция",
    "Тимбилдинг",
    "Фестиваль",
    "Другое"
]

export function CTASection() {
    const [activeType, setActiveType] = useState<string | null>(null)
    const [hoveredButton, setHoveredButton] = useState(false)

    return (
        <section className="min-h-screen bg-white text-black flex flex-col justify-between relative overflow-hidden">

            {/* Main Content - Centered */}
            <div className="flex-1 flex flex-col justify-center items-center px-6 w-full max-w-[1280px] mx-auto z-10">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="w-full max-w-4xl flex flex-col items-center text-center"
                >
                    <FadeUp>
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-12 md:mb-16">
                            Начнем ваш<br />проект?
                        </h2>
                    </FadeUp>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
                        {EVENT_TYPES.map((type, index) => (
                            <motion.button
                                key={type}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                onClick={() => setActiveType(type)}
                                className={`px-6 md:px-8 py-3 md:py-4 rounded-full border text-base md:text-lg transition-all duration-300 ${activeType === type
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-black border-neutral-200 hover:border-black'
                                    }`}
                            >
                                {type}
                            </motion.button>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="w-full max-w-md mb-16 relative group">
                        <input
                            type="text"
                            placeholder="Phone or Telegram"
                            className="w-full bg-transparent border-b border-neutral-300 py-4 text-xl md:text-2xl placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* Magnetic Button */}
                    <MagneticButton>
                        <button
                            onMouseEnter={() => setHoveredButton(true)}
                            onMouseLeave={() => setHoveredButton(false)}
                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-black text-white flex flex-col items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span className="text-xl md:text-2xl font-medium relative z-10">Обсудить<br />событие</span>

                            {/* Hover Blob Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId="hoverBlob"
                            />
                        </button>
                    </MagneticButton>

                </motion.div>
            </div>

            {/* Footer */}
            <footer className="w-full px-6 py-8 border-t border-neutral-100">
                <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base text-neutral-500">
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-black transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-black transition-colors">Telegram</Link>
                        <Link href="#" className="hover:text-black transition-colors">WhatsApp</Link>
                    </div>
                    <div className="font-medium text-neutral-900">
                        aitu.kz
                    </div>
                </div>
            </footer>
        </section>
    )
}

function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)
    const position = { x: useMotionValue(0), y: useMotionValue(0) }

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
    const x = useSpring(position.x, springConfig)
    const y = useSpring(position.y, springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e
        const { height, width, left, top } = ref.current!.getBoundingClientRect()

        const middleX = clientX - (left + width / 2)
        const middleY = clientY - (top + height / 2)

        position.x.set(middleX)
        position.y.set(middleY)
    }

    const handleMouseLeave = () => {
        position.x.set(0)
        position.y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            className="relative"
        >
            {children}
        </motion.div>
    )
}
