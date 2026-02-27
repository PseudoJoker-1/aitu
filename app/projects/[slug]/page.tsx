import React from 'react'
import { notFound } from 'next/navigation'
import { getProjectBySlug, getProjects, getImageUrl } from '@/lib/api'
import { projects as staticProjects } from '@/src/data'
import { ProjectDetailContent } from '@/components/blocks/project-detail-content'

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

        if (project.cover_image && (!project.images?.length || getImageUrl(project.images[0].image) !== coverImage)) {
            images.unshift({ image: coverImage, caption: '' });
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
        <ProjectDetailContent
            project={{
                title: project.title,
                description: project.description,
                cover_image: project.cover_image,
                images: images,
            }}
            coverImage={coverImage}
            images={images}
            isApiProject={isApiProject}
            projectNumber={projectNumber}
        />
    )
}
