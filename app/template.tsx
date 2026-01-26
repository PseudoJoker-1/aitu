'use client'

import { motion } from 'motion/react'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
    // Scroll to top on route change, but respect hash navigation
    useEffect(() => {
        if (!window.location.hash) {
            window.scrollTo(0, 0)
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.99 }} // Optional gentle exit
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] // Custom Apple-style ease
            }}
        >
            {children}
        </motion.div>
    )
}
