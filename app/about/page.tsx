import React from 'react'
import Link from 'next/link'
import { FadeUp } from '@/components/ui/fade-up'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
    return (
        <main className="bg-white min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <FadeUp>
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-black mb-12 md:mb-20 tracking-tight max-w-4xl">
                        Мы создаем события,<br />о которых говорят
                    </h1>
                </FadeUp>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24">
                    <FadeUp delay={0.2}>
                        <div className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed">
                            <p className="mb-8">
                                Aitu.kz — это агентство событийного маркетинга полного цикла. Мы специализируемся на создании масштабных корпоративных мероприятий, фестивалей и конференций.
                            </p>
                            <p>
                                Наша миссия — трансформировать задачи бизнеса в яркие эмоции и незабываемый опыт для аудитории. Мы верим, что каждое событие должно быть уникальным и решать конкретные цели.
                            </p>
                        </div>
                    </FadeUp>

                    <FadeUp delay={0.4}>
                        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-neutral-100">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
                                alt="Team"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </FadeUp>
                </div>

                <FadeUp delay={0.6}>
                    <div className="bg-black rounded-3xl p-8 md:p-16 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Готовы обсудить ваш проект?
                        </h2>
                        <p className="text-neutral-400 max-w-xl mx-auto mb-10 text-lg">
                            Свяжитесь с нами, и мы предложим креативную концепцию для вашего следующего события.
                        </p>
                        <Button
                            asChild
                            size="lg"
                            className="h-14 px-8 rounded-full bg-white text-black font-semibold text-lg hover:bg-neutral-200 transition-colors"
                        >
                            <Link href="/#contacts">
                                Связаться с нами
                            </Link>
                        </Button>
                    </div>
                </FadeUp>
            </div>
        </main>
    )
}
