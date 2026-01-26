'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import logo from '@/img/logo.png'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'

const menuItems = [
    { name: 'Услуги', href: '/#directions' },
    { name: 'Портфолио', href: '/#portfolio' },
    { name: 'О нас', href: '/about' },
    { name: 'Контакты', href: '/#contacts' },
]

export function Header() {
    const [menuState, setMenuState] = React.useState(false)
    const [isMounted, setIsMounted] = React.useState(false)
    const pathname = usePathname()
    const lenis = useLenis()

    React.useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleLogoClick = (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault()
            lenis?.scrollTo(0)
        }
    }

    const handleAnchorClick = (e: React.MouseEvent, href: string) => {
        if (href.startsWith('/#')) {
            const hash = href.replace('/', '')
            const target = document.querySelector(hash)
            if (pathname === '/' && target) {
                e.preventDefault()
                lenis?.scrollTo(hash)
                setMenuState(false)
            }
        }
    }

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
                        onClick={handleLogoClick}
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
                                        onClick={(e) => handleAnchorClick(e, item.href)}
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
                            <Link
                                href="/#contacts"
                                onClick={(e) => handleAnchorClick(e, '/#contacts')}
                            >
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
                                            onClick={(e) => {
                                                handleAnchorClick(e, item.href);
                                                setMenuState(false);
                                            }}
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
                                        <Link
                                            href="/#contacts"
                                            onClick={(e) => {
                                                handleAnchorClick(e, '/#contacts');
                                                setMenuState(false);
                                            }}
                                        >
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
