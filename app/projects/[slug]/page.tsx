import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeUp } from '@/components/ui/fade-up'
import { getProjectBySlug, getProjects, getImageUrl } from '@/lib/api'
import { projects as staticProjects } from '@/src/data'

interface ProjectPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateStaticParams() {
    // Try to fetch from API, fallback to static data
    try {
        const projects = await getProjects();
        if (projects && projects.length > 0) {
            return projects.map((project) => ({
                slug: project.slug,
            }));
        }
    } catch (error) {
        console.log('Using static data for generateStaticParams');
    }

    // Fallback to static projects
    return staticProjects.map((project) => ({
        slug: project.id,
    }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params

    // Try to fetch from API first
    let project = await getProjectBySlug(slug);
    let images: { image: string; caption: string }[] = [];
    let isApiProject = false;

    if (project) {
        isApiProject = true;
        images = project.images?.map(img => ({
            image: getImageUrl(img.image),
            caption: img.caption || ''
        })) || [];
    } else {
        // Fallback to static data
        const staticProject = staticProjects.find((p) => p.id === slug);
        if (staticProject) {
            project = {
                id: 0,
                title: staticProject.title,
                slug: staticProject.id,
                description: staticProject.description,
                images: [],
                created_at: ''
            };
            images = [{ image: staticProject.image, caption: '' }];
        }
    }

    if (!project) {
        notFound()
    }

    // Find project index for numbering (static fallback)
    const projectNumber = staticProjects.findIndex((p) => p.id === slug) + 1 || 1;

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
                                К проектам
                            </Link>
                        </Button>
                    </FadeUp>

                    {/* Header */}
                    <FadeUp delay={0.1}>
                        <div className="mb-4 text-sm font-medium text-gray-500 uppercase tracking-widest">
                            Проект {String(projectNumber).padStart(2, '0')}
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                            {project.title}
                        </h1>
                    </FadeUp>

                    {/* Main Image */}
                    {images.length > 0 && (
                        <FadeUp delay={0.2}>
                            <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-xl">
                                <img
                                    src={images[0].image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </FadeUp>
                    )}

                    {/* Content */}
                    <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16">
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
                                        Мы внимательно подошли к каждому этапу реализации {project.title.toLowerCase()},
                                        чтобы обеспечить максимальное вовлечение аудитории и достичь поставленных целей.
                                    </p>
                                </div>
                            </div>
                        </FadeUp>
                    </div>

                    {/* Gallery - Additional Images */}
                    {images.length > 1 && (
                        <div className="mb-16">
                            <FadeUp delay={0.5}>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400 mb-8">
                                    Галерея
                                </h3>
                            </FadeUp>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {images.slice(1).map((img, index) => (
                                    <FadeUp key={index} delay={0.6 + index * 0.1}>
                                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                                            <img
                                                src={img.image}
                                                alt={img.caption || `${project.title} - Image ${index + 2}`}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        {img.caption && (
                                            <p className="mt-2 text-sm text-gray-500">{img.caption}</p>
                                        )}
                                    </FadeUp>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA */}
                    <FadeUp delay={0.7}>
                        <div className="text-center py-16 border-t border-neutral-200">
                            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
                                Хотите такой же проект?
                            </h3>
                            <Button asChild className="rounded-full bg-black text-white hover:bg-neutral-800 px-8 py-6 text-lg">
                                <Link href="/#cta">
                                    Обсудить проект
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
