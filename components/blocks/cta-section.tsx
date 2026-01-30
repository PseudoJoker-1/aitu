'use client'
import React, { useRef, useState } from 'react'
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react'
import Link from 'next/link'
import { ArrowUpRight, Check, Loader2 } from 'lucide-react'
import { FadeUp } from '@/components/ui/fade-up'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

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
    const [phone, setPhone] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [statusMessage, setStatusMessage] = useState('')

    const handleSubmit = async () => {
        if (!phone.trim()) {
            setSubmitStatus('error')
            setStatusMessage('Пожалуйста, введите номер телефона')
            setTimeout(() => setSubmitStatus('idle'), 3000)
            return
        }

        setIsSubmitting(true)
        setSubmitStatus('idle')

        try {
            const response = await fetch(`${API_BASE_URL}/api/leads/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: 'Заявка с сайта',
                    phone: phone,
                    event_type: activeType || 'Не указан',
                }),
            })

            if (response.ok) {
                setSubmitStatus('success')
                setStatusMessage('Спасибо! Мы свяжемся с вами.')
                setPhone('')
                setActiveType(null)
                setTimeout(() => setSubmitStatus('idle'), 5000)
            } else {
                setSubmitStatus('error')
                setStatusMessage('Произошла ошибка. Попробуйте позже.')
                setTimeout(() => setSubmitStatus('idle'), 3000)
            }
        } catch (error) {
            console.error('Error submitting lead:', error)
            setSubmitStatus('error')
            setStatusMessage('Ошибка сети. Проверьте подключение.')
            setTimeout(() => setSubmitStatus('idle'), 3000)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="cta" className="min-h-screen bg-white text-black flex flex-col justify-between relative overflow-hidden">

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
                                onClick={() => setActiveType(type === activeType ? null : type)}
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
                    <div className="w-full max-w-md mb-8 relative group">
                        <input
                            type="text"
                            placeholder="Телефон или Telegram"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                            className="w-full bg-transparent border-b border-neutral-300 py-4 text-xl md:text-2xl placeholder:text-neutral-400 focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* Status Message */}
                    {submitStatus !== 'idle' && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mb-8 px-6 py-3 rounded-full text-lg font-medium ${submitStatus === 'success'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                                }`}
                        >
                            {submitStatus === 'success' && <Check className="inline-block mr-2 h-5 w-5" />}
                            {statusMessage}
                        </motion.div>
                    )}

                    {/* Magnetic Button */}
                    <MagneticButton>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            onMouseEnter={() => setHoveredButton(true)}
                            onMouseLeave={() => setHoveredButton(false)}
                            className="relative w-48 h-48 md:w-64 md:h-64 rounded-full bg-black text-white flex flex-col items-center justify-center gap-2 group cursor-pointer disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-8 w-8 animate-spin" />
                            ) : (
                                <span className="text-xl md:text-2xl font-medium relative z-10">Обсудить<br />событие</span>
                            )}

                            {/* Hover Blob Effect */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-neutral-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId="hoverBlob"
                            />
                        </button>
                    </MagneticButton>

                </motion.div>

                {/* OR Block and WhatsApp */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center gap-8 mt-16 mb-24"
                >
                    <div className="text-center">
                        <h3 className="text-6xl md:text-8xl font-bold text-neutral-200 select-none">ИЛИ</h3>
                        <p className="text-neutral-500 font-medium mt-2">связаться с нами в</p>
                    </div>

                    <MagneticButton>
                        <a
                            href="https://wa.me/77026338118"
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHoveredButton(true)}
                            onMouseLeave={() => setHoveredButton(false)}
                            className="relative w-40 h-40 md:w-48 md:h-48 rounded-full bg-[#25D366] text-white flex flex-col items-center justify-center gap-3 group cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-300"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 md:w-12 md:h-12 relative z-10">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            <span className="text-lg font-medium relative z-10">WhatsApp</span>

                            {/* Hover Blob Effect - Light Green */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#1EBc57] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                layoutId="hoverBlobWA"
                            />
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>


            {/* Footer removed */}
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
