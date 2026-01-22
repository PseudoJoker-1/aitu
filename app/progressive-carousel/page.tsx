"use client";
import React from 'react';
import Image from 'next/image';
import {
    SliderBtnGroup,
    ProgressSlider,
    SliderBtn,
    SliderContent,
    SliderWrapper,
} from '@/components/ui/progressive-carousel';

const items = [
    {
        img: "https://images.unsplash.com/photo-1709949908058-a08659bfa922?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: 'Bridge',
        desc: 'A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.',
        sliderName: 'bridge',
    },
    {
        img: "https://images.unsplash.com/photo-1518972734183-c5b490a7c637?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        title: 'Mountains View',
        desc: 'A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.',
        sliderName: 'mountains',
    },
];

export default function ProgressiveCarouselDemo() {
    return (
        <main className="min-h-screen bg-black py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl text-white font-bold mb-10 text-center">Progressive Carousel Demo</h1>
                <div className="max-w-4xl mx-auto">
                    <ProgressSlider vertical={false} activeSlider='bridge'>
                        <SliderContent>
                            {items.map((item, index) => (
                                <SliderWrapper key={index} value={item?.sliderName}>
                                    <div className="relative aspect-video w-full rounded-xl overflow-hidden">
                                        <img
                                            className='object-cover w-full h-full'
                                            src={item.img}
                                            alt={item.desc}
                                        />
                                    </div>
                                </SliderWrapper>
                            ))}
                        </SliderContent>

                        <SliderBtnGroup className='absolute bottom-0 h-fit dark:text-white text-black dark:bg-black/40 bg-white/40  backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4  rounded-md w-full'>
                            {items.map((item, index) => (
                                <SliderBtn
                                    key={index}
                                    value={item?.sliderName}
                                    className='text-left cursor-pointer p-3 border-r last:border-r-0'
                                    progressBarClass='dark:bg-black bg-white h-full'
                                >
                                    <h2 className='relative px-4 rounded-full w-fit dark:bg-white dark:text-black text-white bg-gray-900 mb-2'>
                                        {item.title}
                                    </h2>
                                    <p className='text-sm font-medium  line-clamp-2'>{item.desc}</p>
                                </SliderBtn>
                            ))}
                        </SliderBtnGroup>
                    </ProgressSlider>
                </div>
            </div>
        </main>
    );
}
