'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

export function Footer() {
    const { t } = useTranslation()

    return (
        <footer id="contacts" className="w-full px-6 py-12 border-t border-neutral-100 bg-white">
            <div className="max-w-[1280px] mx-auto">
                {/* Top row: contacts & socials */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
                    {/* Contact info */}
                    <div className="flex flex-col sm:flex-row gap-6">
                        <a href="mailto:aitu.kzevents@mail.ru" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors">
                            <Mail className="w-4 h-4" />
                            <span>aitu.kzevents@mail.ru</span>
                        </a>
                        <a href="tel:+77026338118" className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors">
                            <Phone className="w-4 h-4" />
                            <span>+7 702 633 8118</span>
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="flex gap-8">
                        <Link href="https://www.instagram.com/aitu.kz_event_agency/" target="_blank" className="text-neutral-500 hover:text-black transition-colors">
                            Instagram
                        </Link>
                        <Link href="https://wa.me/77026338118" target="_blank" className="text-neutral-500 hover:text-black transition-colors">
                            WhatsApp
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-400">
                    <div className="font-medium text-neutral-900">aitu.kz</div>
                    <div>{t('footer.copyright')}</div>
                </div>
            </div>
        </footer>
    )
}
