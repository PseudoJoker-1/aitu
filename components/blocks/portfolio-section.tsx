"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FadeUp } from "@/components/ui/fade-up"
import { cn } from "@/lib/utils"
import { projects as staticProjects, Project } from "@/src/data"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

const CYCLE_DURATION = 10000 // 10 seconds
const TEXT_EXIT_TIME = 9200 // 9.2s
const NUMBER_ROLL_TIME = 9400 // 9.4s  
const IMAGE_EXIT_TIME = 9600 // 9.6s

// Transform API project to the format expected by the component
function transformApiProject(apiProject: any, index: number): Project {
    const firstImage = apiProject.cover_image
        ? apiProject.cover_image
        : (apiProject.images && apiProject.images.length > 0 ? apiProject.images[0].image : '');

    const imageUrl = firstImage.startsWith('http')
        ? firstImage
        : `${API_BASE_URL}${firstImage}`;

    return {
        id: apiProject.slug || apiProject.id,
        slug: apiProject.slug,
        number: String(index + 1).padStart(2, '0'),
        title: apiProject.title,
        description: apiProject.description,
        image: imageUrl,
        images: apiProject.images,
        content: apiProject.description,
    };
}

export function PortfolioSection() {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [progress, setProgress] = React.useState(0)
    const [isTransitioning, setIsTransitioning] = React.useState(false)
    const [textVisible, setTextVisible] = React.useState(true)
    const [imageVisible, setImageVisible] = React.useState(true)
    const [projects, setProjects] = React.useState<Project[]>(staticProjects)
    const [loading, setLoading] = React.useState(true)
    const startTimeRef = React.useRef<number | null>(null)
    const rafRef = React.useRef<number | null>(null)
    const { t } = useTranslation()

    // Fetch projects from API
    React.useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await fetch(`${API_BASE_URL}/api/projects/`);
                if (response.ok) {
                    const apiProjects = await response.json();
                    if (apiProjects && apiProjects.length > 0) {
                        setProjects(apiProjects.map(transformApiProject));
                    }
                }
            } catch (error) {
                console.log('Using static data fallback');
            } finally {
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    const currentProject = projects[currentIndex]
    const totalProjects = projects.length

    const resetAndGoTo = React.useCallback((newIndex: number) => {
        // Cancel any running animation
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current)
        }

        // Start transition sequence
        setIsTransitioning(true)
        setTextVisible(false)

        setTimeout(() => {
            setImageVisible(false)
        }, 200)

        setTimeout(() => {
            setCurrentIndex(newIndex)
            setProgress(0)
            startTimeRef.current = null
            setTextVisible(true)
            setImageVisible(true)
            setIsTransitioning(false)
        }, 400)
    }, [])

    const goToNext = React.useCallback(() => {
        const nextIndex = (currentIndex + 1) % totalProjects
        resetAndGoTo(nextIndex)
    }, [currentIndex, totalProjects, resetAndGoTo])

    const goToPrev = React.useCallback(() => {
        const prevIndex = (currentIndex - 1 + totalProjects) % totalProjects
        resetAndGoTo(prevIndex)
    }, [currentIndex, totalProjects, resetAndGoTo])

    React.useEffect(() => {
        if (isTransitioning) return

        const animate = (time: number) => {
            if (!startTimeRef.current) {
                startTimeRef.current = time
            }

            const elapsed = time - startTimeRef.current
            const newProgress = Math.min((elapsed / CYCLE_DURATION) * 100, 100)
            setProgress(newProgress)

            // Trigger transition sequence at specific times
            if (elapsed >= TEXT_EXIT_TIME && textVisible) {
                setTextVisible(false)
            }

            if (elapsed >= IMAGE_EXIT_TIME && imageVisible) {
                setImageVisible(false)
            }

            if (elapsed >= CYCLE_DURATION) {
                // Complete cycle - move to next
                const nextIndex = (currentIndex + 1) % totalProjects
                setCurrentIndex(nextIndex)
                setProgress(0)
                startTimeRef.current = null
                setTextVisible(true)
                setImageVisible(true)
            }

            rafRef.current = requestAnimationFrame(animate)
        }

        rafRef.current = requestAnimationFrame(animate)

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current)
            }
        }
    }, [currentIndex, isTransitioning, textVisible, imageVisible, totalProjects])

    // Get translated title/description with fallback
    const getProjectTitle = (project: Project) => {
        if (project.titleKey) return t(project.titleKey)
        return project.title
    }

    const getProjectDescription = (project: Project) => {
        if (project.descriptionKey) return t(project.descriptionKey)
        return project.description
    }

    // Get the project URL - prefer slug for API projects
    const getProjectUrl = (project: Project) => {
        return `/projects/${project.slug || project.id}`;
    }

    return (
        <section id="portfolio" className="w-full bg-white py-20 md:py-32 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                {/* Header with navigation */}
                <div className="flex items-end justify-between mb-16">
                    <FadeUp>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black tracking-tight">
                            {t('portfolio.title')}
                        </h2>
                    </FadeUp>
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
                            onClick={goToPrev}
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="sr-only">Previous project</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-12 w-12 rounded-full border-gray-200 hover:bg-gray-100 hover:text-black transition-colors"
                            onClick={goToNext}
                        >
                            <ArrowRight className="h-5 w-5" />
                            <span className="sr-only">Next project</span>
                        </Button>
                    </div>
                </div>

                {/* Main content - Split screen */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 min-h-[500px] md:min-h-[600px]">
                    {/* Left side - Text with background number */}
                    <div className="relative flex flex-col justify-center">
                        {/* Outlined watermark number — anchored bottom-right, bleeds out gracefully */}
                        <div className="absolute inset-0 overflow-visible pointer-events-none select-none" style={{ zIndex: 0 }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`outline-${currentProject.id}`}
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -80, opacity: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute top-1/2 right-[0%] -translate-y-1/2 text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[28rem] font-bold leading-none whitespace-nowrap"
                                    style={{
                                        color: 'transparent',
                                        WebkitTextStroke: '2px rgba(0, 0, 0, 0.08)',
                                    }}
                                >
                                    {parseInt(currentProject.number).toString()}
                                </motion.span>
                            </AnimatePresence>

                            {/* Fill layer — stroke darkens from bottom as progress advances */}
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={`fill-${currentProject.id}`}
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -80, opacity: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                    className="absolute top-1/2 right-[0%] -translate-y-1/2 text-[12rem] sm:text-[16rem] md:text-[20rem] lg:text-[28rem] font-bold leading-none whitespace-nowrap"
                                    style={{
                                        color: 'transparent',
                                        WebkitTextStroke: '2px rgba(0, 0, 0, 0.25)',
                                        clipPath: `inset(${100 - progress}% 0 0 0)`,
                                    }}
                                >
                                    {parseInt(currentProject.number).toString()}
                                </motion.span>
                            </AnimatePresence>
                        </div>

                        {/* Text content — guaranteed above the watermark */}
                        <div className="relative z-10 max-w-md">
                            <AnimatePresence mode="wait">
                                {textVisible && (
                                    <motion.div
                                        key={`text-${currentProject.id}`}
                                        initial={{ y: 40, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -60, opacity: 0 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                    >
                                        <span className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4 block">
                                            {t('portfolio.project')} {currentProject.number} / {String(totalProjects).padStart(2, '0')}
                                        </span>
                                        <Link href={getProjectUrl(currentProject)}>
                                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-6 hover:underline decoration-2 underline-offset-4 decoration-black/30 transition-all">
                                                {getProjectTitle(currentProject)}
                                            </h3>
                                        </Link>
                                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                            {getProjectDescription(currentProject)}
                                        </p>

                                        <Button asChild variant="outline" className="rounded-full border-black text-black hover:bg-black hover:text-white transition-colors">
                                            <Link href={getProjectUrl(currentProject)}>
                                                {t('portfolio.viewProject')}
                                            </Link>
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div className="relative h-[400px] md:h-[500px] lg:h-full rounded-3xl overflow-hidden cursor-pointer group">
                        <Link href={getProjectUrl(currentProject)}>
                            <AnimatePresence mode="wait">
                                {imageVisible && (
                                    <motion.div
                                        key={`image-${currentProject.id}`}
                                        initial={{ y: 60, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        exit={{ y: -80, opacity: 0 }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.25, 0.46, 0.45, 0.94]
                                        }}
                                        className="absolute inset-0"
                                    >
                                        <img
                                            src={currentProject.image}
                                            alt={getProjectTitle(currentProject)}
                                            className="w-full h-full object-cover origin-center transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Link>
                    </div>
                </div>

                {/* Progress indicators */}
                <div className="flex justify-center gap-3 mt-12">
                    {projects.map((project, index) => (
                        <button
                            key={project.id}
                            onClick={() => resetAndGoTo(index)}
                            className="h-2 w-16 bg-gray-200 rounded-full overflow-hidden cursor-pointer hover:bg-gray-300 transition-colors"
                        >
                            <div
                                className="h-full bg-black rounded-full"
                                style={{
                                    width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%',
                                    transition: index === currentIndex ? 'none' : 'width 0.3s ease'
                                }}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}
