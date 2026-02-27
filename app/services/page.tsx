'use client'

import React from 'react'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/fade-up'
import { Button } from '@/components/ui/button'
import { ArrowRight, Volume2, Palette, Camera } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'

const SERVICES_DATA = [
    {
        icon: Volume2,
        titleKey: 'addServices.equipment.title',
        descKey: 'addServices.equipment.desc',
        features: [
            'addServices.equipment.f1',
            'addServices.equipment.f2',
            'addServices.equipment.f3',
            'addServices.equipment.f4',
        ],
        image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=1000&auto=format&fit=crop',
    },
    {
        icon: Palette,
        titleKey: 'addServices.decor.title',
        descKey: 'addServices.decor.desc',
        features: [
            'addServices.decor.f1',
            'addServices.decor.f2',
            'addServices.decor.f3',
            'addServices.decor.f4',
        ],
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1000&auto=format&fit=crop',
    },
    {
        icon: Camera,
        titleKey: 'addServices.photoVideo.title',
        descKey: 'addServices.photoVideo.desc',
        features: [
            'addServices.photoVideo.f1',
            'addServices.photoVideo.f2',
            'addServices.photoVideo.f3',
            'addServices.photoVideo.f4',
        ],
        image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000&auto=format&fit=crop',
    },
]

export default function ServicesPage() {
    const { t } = useTranslation()

    return (
        <main className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                {/* Page Header */}
                <FadeUp>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-6 tracking-tight max-w-4xl">
                        {t('addServices.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 mb-16 md:mb-24 max-w-2xl">
                        {t('addServices.subtitle')}
                    </p>
                </FadeUp>

                {/* Services List */}
                <div className="space-y-24 md:space-y-32">
                    {SERVICES_DATA.map((service, index) => {
                        const Icon = service.icon
                        const isReversed = index % 2 !== 0

                        return (
                            <FadeUp key={index} delay={index * 0.1}>
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${isReversed ? 'lg:direction-rtl' : ''}`}>
                                    {/* Image */}
                                    <div className={`relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-neutral-100 ${isReversed ? 'lg:order-2' : ''}`}>
                                        <img
                                            src={service.image}
                                            alt={t(service.titleKey)}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                        {/* Subtle overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                    </div>

                                    {/* Content */}
                                    <div className={`${isReversed ? 'lg:order-1' : ''}`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center">
                                                <Icon className="w-6 h-6 text-black" />
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-black">
                                                {t(service.titleKey)}
                                            </h2>
                                        </div>

                                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                            {t(service.descKey)}
                                        </p>

                                        {/* Features */}
                                        <ul className="space-y-3 mb-8">
                                            {service.features.map((featureKey, fIndex) => (
                                                <li key={fIndex} className="flex items-center gap-3 text-gray-700">
                                                    <div className="w-2 h-2 rounded-full bg-black flex-shrink-0" />
                                                    <span className="text-base">{t(featureKey)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </FadeUp>
                        )
                    })}
                </div>

                {/* CTA Section */}
                <div className="mt-24 md:mt-40">
                    <FadeUp delay={0.6}>
                        <div className="bg-black rounded-3xl p-8 md:p-16 text-center text-white">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                {t('addServices.ctaTitle')}
                            </h2>
                            <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
                                {t('addServices.ctaDesc')}
                            </p>
                            <Button
                                asChild
                                size="lg"
                                className="h-14 px-8 rounded-full bg-white text-black font-semibold text-lg hover:bg-neutral-200 transition-colors"
                            >
                                <Link href="/#contacts">
                                    {t('addServices.ctaButton')}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </FadeUp>
                </div>
            </div>
        </main>
    )
}
