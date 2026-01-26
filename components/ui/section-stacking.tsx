'use client'
import { motion, useScroll, useTransform } from 'motion/react'
import { ReactNode, useRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionStackingProps {
    children: ReactNode
    className?: string
}

export function SectionStacking({ children, className }: SectionStackingProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    })

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5])
    const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(10px)"])

    return (
        <div ref={containerRef} className="relative w-full overflow-visible">
            <motion.div
                style={{ scale, opacity, filter: blur }}
                className={cn("sticky top-0 w-full bg-white", className)}
            >
                {children}
            </motion.div>
        </div>
    )
}
