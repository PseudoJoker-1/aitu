'use client'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'motion/react'
import { cn } from '@/lib/utils'
import { FadeUp } from '@/components/ui/fade-up'

const steps = [
    {
        number: '01',
        title: 'Звонок и бриф',
        description: 'Мы начинаем с глубокого погружения в ваши задачи. Изучаем аудиторию, анализируем контекст и формируем четкое видение целей вашего события.'
    },
    {
        number: '02',
        title: 'Встреча и детали мероприятия',
        description: 'На основе встречи мы обсуждаем все детали мероприятия и формируем четкое видение целей вашего события.'
    },
    {
        number: '03',
        title: 'Коммерческое предложение и смета',
        description: 'Мы формируем детальное предложение после встречи, включающее визуализацию идей, смету и таймлайны.'
    },
    {
        number: '04',
        title: 'Составление договора',
        description: 'Мы готовим договор и отправляем вам на ознакомление.'
    },
    {
        number: '05',
        title: 'Идеальное мероприятие',
        description: 'Финальный аккорд. Мы не просто организуем событие, мы создаем атмосферу и эмоции, которые остаются в памяти надолго.'
    }
]

export function ProcessSection() {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Move content horizontally based on vertical scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])

    // Connecting line fills horizontally
    const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section
            ref={targetRef}
            className="relative h-[500vh] bg-white text-black"
        >
            {/* Sticky Container */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 opacity-40 select-none pointer-events-none"
                    style={{
                        backgroundImage: 'url(/process-bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-0 bg-linear-to-b from-transparent via-white/10 to-white/90" />
                <div className="absolute inset-0 z-0 bg-white/30 backdrop-blur-3xl" />

                {/* Title */}
                <div className="absolute top-12 left-6 md:left-12 z-20">
                    <FadeUp>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                            Путь к<br />событию
                        </h2>
                    </FadeUp>
                </div>

                {/* Horizontal Scrolling Content */}
                <motion.div style={{ x }} className="flex gap-12 md:gap-24 pl-[10vw] pr-24 items-start relative z-10 pt-32">

                    {/* Connecting Line Container */}
                    <div className="absolute top-[35%] left-[5vw] right-0 h-[1px] z-0">
                        <div className="absolute inset-0 bg-black/10 w-full" />
                        <motion.div
                            className="absolute top-0 left-0 bottom-0 bg-black"
                            style={{ width: lineWidth }}
                        />
                    </div>

                    {steps.map((step, index) => (
                        <StepItem
                            key={index}
                            step={step}
                            index={index}
                            parentScrollProgress={scrollYProgress}
                            totalSteps={steps.length}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function StepItem({
    step,
    index,
    parentScrollProgress,
    totalSteps
}: {
    step: typeof steps[0],
    index: number,
    parentScrollProgress: MotionValue,
    totalSteps: number
}) {
    // Calculate the range of scroll execution for this specific step
    // We want the fill to happen *as the item enters and moves to center*
    // Simple distribution: 
    // Step 0: 0.0 - 0.15
    // Step 1: 0.15 - 0.30
    // etc.
    const stepSize = 1 / totalSteps;
    const start = index * stepSize;
    const end = start + (stepSize * 0.8); // Fill slightly faster than the full travel

    const fillHeight = useTransform(parentScrollProgress, [start, end], ["0%", "100%"])

    return (
        <div
            className="flex flex-col gap-6 relative z-10 min-w-[300px] md:min-w-[450px]"
        >
            {/* Number Container */}
            <div className="relative text-8xl md:text-[10rem] font-bold leading-none tracking-tighter select-none">
                {/* Outline Number (Base) */}
                <span
                    className="text-transparent"
                    style={{
                        WebkitTextStroke: '1px rgba(0,0,0,0.2)',
                        color: 'transparent'
                    }}
                >
                    {step.number}
                </span>

                {/* Filled Number (Scroll Synced) */}
                <motion.div
                    className="absolute inset-0 overflow-hidden text-black block"
                    style={{ height: fillHeight }}
                >
                    {step.number}
                </motion.div>
            </div>

            {/* Content */}
            <div className="max-w-md">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-5 leading-tight">
                    {step.title}
                </h3>
                <p className="text-base md:text-lg text-gray-700 font-light leading-relaxed">
                    {step.description}
                </p>
            </div>
        </div>
    )
}
