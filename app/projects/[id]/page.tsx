import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeUp } from '@/components/ui/fade-up'
import { projects } from '@/src/data'

interface ProjectPageProps {
    params: Promise<{
        id: string
    }>
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        id: project.id,
    }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { id } = await params
    const project = projects.find((p) => p.id === id)

    if (!project) {
        notFound()
    }

    return (
        <main className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back Button */}
                    <FadeUp>
                        <Button
                            asChild
                            variant="ghost"
                            className="mb-8 hover:bg-neutral-100 -ml-4"
                        >
                            <Link href="/">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                На главную
                            </Link>
                        </Button>
                    </FadeUp>

                    {/* Header */}
                    <FadeUp delay={0.1}>
                        <div className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
                            Проект {project.number}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                            {project.title}
                        </h1>
                    </FadeUp>

                    {/* Main Image */}
                    <FadeUp delay={0.2}>
                        <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-xl">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </FadeUp>

                    {/* Content */}
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12">
                        <FadeUp delay={0.3}>
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-4">
                                    Описание
                                </h3>
                            </div>
                        </FadeUp>

                        <FadeUp delay={0.4}>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p className="text-xl font-medium text-black">
                                    {project.description}
                                </p>
                                <div className="prose prose-lg text-gray-600">
                                    <p>
                                        {project.content || project.description}
                                    </p>
                                    <p>
                                        Текст для демонстрации. Здесь может быть детальное описание кейса,
                                        поставленные задачи, принятые решения и достигнутые результаты.
                                        Мы внимательно подошли к каждому этапу реализации {project.title.toLowerCase()},
                                        чтобы обеспечить максимальное вовлечение аудитории.
                                    </p>
                                </div>
                            </div>
                        </FadeUp>
                    </div>
                </div>
            </div>
        </main>
    )
}
