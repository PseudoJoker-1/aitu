'use client'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface FadeUpProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98] // Clean, smooth easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
