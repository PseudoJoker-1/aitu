import React from 'react'
import Image from 'next/image'
import { VirtualGallery } from '@/components/ui/virtual-gallery'
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
    let coverImage = '';

    if (project) {
        isApiProject = true;
        coverImage = project.cover_image ? getImageUrl(project.cover_image) : (project.images?.[0] ? getImageUrl(project.images[0].image) : '');
        images = project.images?.map(img => ({
            image: getImageUrl(img.image),
            caption: img.caption || ''
        })) || [];

        // If we have a cover image and it's not the same as the first gallery image, 
        // add it to the front of the lightbox images array for seamless browsing.
        // Or if we just rely on cover image being separate:
        if (project.cover_image && (!project.images?.length || getImageUrl(project.images[0].image) !== coverImage)) {
            images.unshift({ image: coverImage, caption: 'Главное фото' });
        }
    } else {
        // Fallback to static data
        const staticProject = staticProjects.find((p) => p.id === slug);
        if (staticProject) {
            project = {
                id: typeof staticProject.id === 'string' ? parseInt(staticProject.id, 10) || 0 : staticProject.id,
                title: staticProject.title,
                slug: String(staticProject.id),
                description: staticProject.description,
                images: [],
                created_at: ''
            };
            coverImage = staticProject.image;
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
                                    Описание
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
