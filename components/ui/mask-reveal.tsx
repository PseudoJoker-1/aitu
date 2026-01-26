'use client'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

interface MaskRevealProps {
    children: ReactNode
    className?: string
    delay?: number
}

export function MaskReveal({ children, className, delay = 0 }: MaskRevealProps) {
    return (
        <div className="relative overflow-hidden w-fit">
            <motion.div
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                    duration: 1.2,
                    delay,
                    ease: [0.76, 0, 0.24, 1]
                }}
                className={className}
            >
                {children}
            </motion.div>
        </div>
    )
}
