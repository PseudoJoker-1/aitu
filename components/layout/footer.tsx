'use client'

import React from 'react'
import Link from 'next/link'

export function Footer() {
    return (
        <footer id="contacts" className="w-full px-6 py-8 border-t border-neutral-100 bg-white">
            <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm md:text-base text-neutral-500">
                <div className="flex gap-8">
                    <Link href="https://www.instagram.com/aitu.kz_event_agency/" className="hover:text-black transition-colors">Instagram</Link>
                    <Link href="https://wa.me/77026338118" className="hover:text-black transition-colors">WhatsApp</Link>
                </div>
                <div className="font-medium text-neutral-900">
                    aitu.kz
                </div>
            </div>
        </footer>
    )
}
