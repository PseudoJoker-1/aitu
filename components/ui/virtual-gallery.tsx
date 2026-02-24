"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Lightbox } from './lightbox'

interface VirtualGalleryProps {
    images: { image: string; caption?: string }[]
    projectName: string
}

export function VirtualGallery({ images, projectName }: VirtualGalleryProps) {
    const [visibleCount, setVisibleCount] = useState(12) // Start with 12 images
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
    const observerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Create an IntersectionObserver that reveals more images when the 
        // user scrolls close to the bottom of the currently loaded chunks.
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0]
                if (target.isIntersecting) {
                    // Load 12 more images each time the user hits the bottom trigger
                    setTimeout(() => {
                        setVisibleCount((prev) => Math.min(prev + 12, images.length))
                    }, 50)
                }
            },
            {
                // Trigger when the element is 300px away from the viewport
                rootMargin: '300px',
            }
        )

        const currentTarget = observerRef.current
        if (currentTarget) {
            observer.observe(currentTarget)
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget)
            }
        }
    }, [images.length])

    // Slices only the currently "visible" chunks of images to render in the DOM
    const visibleImages = images.slice(0, visibleCount)

    const handleNext = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex + 1) % images.length)
        }
    }

    const handlePrev = () => {
        if (selectedIndex !== null) {
            setSelectedIndex((selectedIndex - 1 + images.length) % images.length)
        }
    }

    return (
        <div className="space-y-8">
            <h3 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                Галерея
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleImages.map((img, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        // To prevent excessive re-renders/lag, we don't wrap these in heavy animation components
                        className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                    >
                        <Image
                            src={img.image}
                            alt={img.caption || `${projectName} - Image ${index + 2}`}
                            fill
                            unoptimized={true}
                            loading={index < 3 ? "eager" : "lazy"} // Eager load the very first row
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {img.caption && (
                            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                <p className="text-sm text-white font-medium truncate">{img.caption}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Hidden trigger div that fires the IntersectionObserver when scrolled into view */}
            {visibleCount < images.length && (
                <div ref={observerRef} className="h-10 w-full" aria-hidden="true" />
            )}

            {/* Lightbox Overlay */}
            {selectedIndex !== null && (
                <Lightbox
                    images={images}
                    currentIndex={selectedIndex}
                    onClose={() => setSelectedIndex(null)}
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
        </div>
    )
}
