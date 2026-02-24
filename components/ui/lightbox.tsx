"use client"

import React, { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface LightboxProps {
    images: { image: string; caption?: string }[]
    currentIndex: number
    onClose: () => void
    onNext: () => void
    onPrev: () => void
}

export function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
    const currentImage = images[currentIndex]

    // Handle keyboard navigation
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
        if (e.key === 'ArrowRight') onNext()
        if (e.key === 'ArrowLeft') onPrev()
    }, [onClose, onNext, onPrev])

    // Lock body scroll and attach event listener when mounted
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        window.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = 'unset'
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    // If there is only one image, don't show arrows
    const showArrows = images.length > 1

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
            onClick={onClose}
        >
            {/* Top Bar Navigation */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 md:p-6 z-50 bg-gradient-to-b from-black/50 to-transparent">
                <span className="text-white/80 font-medium tracking-widest text-sm">
                    {currentIndex + 1} / {images.length}
                </span>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20 rounded-full h-12 w-12"
                >
                    <X className="h-6 w-6" />
                </Button>
            </div>

            {/* Left Button */}
            {showArrows && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12 md:h-16 md:w-16 z-50"
                >
                    <ChevronLeft className="h-8 w-8 md:h-10 md:w-10" />
                </Button>
            )}

            {/* Main Image Container */}
            <div
                className="relative w-full h-full max-w-7xl max-h-[85vh] mx-auto p-4 md:p-16 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking the image itself
            >
                <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                        src={currentImage.image}
                        alt={currentImage.caption || `Image ${currentIndex + 1}`}
                        fill
                        unoptimized={true}
                        priority
                        className="object-contain" // Maintains aspect ratio without cropping
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* Right Button */}
            {showArrows && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-12 w-12 md:h-16 md:w-16 z-50"
                >
                    <ChevronRight className="h-8 w-8 md:h-10 md:w-10" />
                </Button>
            )}

            {/* Bottom Caption */}
            {currentImage.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/80 to-transparent text-center z-50 pointer-events-none">
                    <p className="text-white text-lg md:text-xl font-medium">{currentImage.caption}</p>
                </div>
            )}
        </div>
    )
}
