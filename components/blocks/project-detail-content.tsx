'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeUp } from '@/components/ui/fade-up'
import { VirtualGallery } from '@/components/ui/virtual-gallery'
import { useTranslation } from '@/lib/i18n'

interface ProjectDetailContentProps {
    project: {
        title: string;
        description: string;
        cover_image?: string;
        images?: { image: string; caption: string }[];
    };
    coverImage: string;
    images: { image: string; caption: string }[];
    isApiProject: boolean;
    projectNumber: number;
}

export function ProjectDetailContent({
    project,
    coverImage,
    images,
    isApiProject,
    projectNumber,
}: ProjectDetailContentProps) {
    const { t } = useTranslation()

    return (
        <main className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <FadeUp>
                        <Button
                            asChild
                            variant="ghost"
                            className="mb-8 hover:bg-neutral-100 -ml-4"
                        >
                            <Link href="/#portfolio">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {t('projectDetail.back')}
                            </Link>
                        </Button>
                    </FadeUp>

                    {/* Header */}
                    <FadeUp delay={0.1}>
                        <div className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
                            {t('projectDetail.project')} {String(projectNumber).padStart(2, '0')}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                            {project.title}
                        </h1>
                    </FadeUp>

                    {/* Main Image */}
                    {coverImage && (
                        <FadeUp delay={0.2}>
                            <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-xl">
                                <Image
                                    src={coverImage}
                                    alt={project.title}
                                    fill
                                    priority
                                    unoptimized={true}
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                                />
                            </div>
                        </FadeUp>
                    )}

                    {/* Content */}
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16">
                        <FadeUp delay={0.3}>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                                    {t('projectDetail.description')}
                                </h3>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.4}>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p className="text-xl font-medium text-black">
                                    {project.description}
                                </p>
                            </div>
                        </FadeUp>
                    </div>

                    {/* Gallery - Additional Images */}
                    {images.length > 0 && (
                        <div className="mb-16">
                            <FadeUp delay={0.5}>
                                <VirtualGallery
                                    images={isApiProject && project.cover_image ? images.slice(1) : images.slice(1)}
                                    projectName={project.title}
                                />
                            </FadeUp>
                        </div>
                    )}

                    {/* CTA */}
                    <FadeUp delay={0.7}>
                        <div className="text-center py-16 border-t border-neutral-200">
                            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                                {t('projectDetail.wantSame')}
                            </h3>
                            <Button asChild className="rounded-full bg-black text-white hover:bg-neutral-800 px-8 py-6 text-lg">
                                <Link href="/#cta">
                                    {t('projectDetail.discuss')}
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
