
export interface ProjectImage {
    id?: number;
    image: string;
    caption?: string;
    order?: number;
}

export interface Project {
    id: string | number;
    slug?: string;
    number: string;
    title: string;
    description: string;
    image: string;
    images?: ProjectImage[];
    content?: string;
    created_at?: string;
}


export interface Service {
    id: string;
    title: string;
    image: string;
    description?: string;
}

export interface ProcessStep {
    number: string;
    title: string;
    description: string;
}

export const projects: Project[] = [
    {
        id: "corporate-forum",
        number: "01",
        title: "Корпоративный форум",
        description: "Масштабное мероприятие для 500+ участников с интерактивными зонами, выступлениями спикеров мирового уровня и networking-сессиями.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание корпоративного форума..."
    },
    {
        id: "music-festival",
        number: "02",
        title: "Музыкальный фестиваль",
        description: "Трехдневный open-air с участием 50+ артистов, фуд-кортами и арт-инсталляциями на территории более 10 гектаров.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание музыкального фестиваля..."
    },
    {
        id: "wedding-celebration",
        number: "03",
        title: "Свадебное торжество",
        description: "Эксклюзивная свадьба в исторической усадьбе с персонализированным декором, живой музыкой и авторским меню.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание свадебного торжества..."
    },
    {
        id: "business-conference",
        number: "04",
        title: "Бизнес-конференция",
        description: "Международная конференция с синхронным переводом, онлайн-трансляцией и интерактивными воркшопами.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание бизнес-конференции..."
    },
]

export const services: Service[] = [
    {
        id: "corporate-events",
        title: "Корпоративные события",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "festivals",
        title: "Масштабные фестивали",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "private-parties",
        title: "Частные праздники",
        image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "conferences",
        title: "Конференции",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "exhibitions",
        title: "Выставки",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000&auto=format&fit=crop"
    }
]

export const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Звонок и бриф',
        description: 'Мы начинаем с глубокого погружения в ваши задачи. Изучаем аудиторию, анализируем контекст и формируем четкое видение целей вашего события.'
    },
    {
        number: '02',
        title: 'Встреча и детали мероприятия',
        description: 'На основе встречи мы обсуждаем все детали мероприятия и формируем четкое видение целей вашего события.'
    },
    {
        number: '03',
        title: 'Коммерческое предложение и смета',
        description: 'Мы формируем детальное предложение после встречи, включающее визуализацию идей, смету и таймлайны.'
    },
    {
        number: '04',
        title: 'Составление договора',
        description: 'Мы готовим договор и отправляем вам на ознакомление.'
    },
    {
        number: '05',
        title: 'Идеальное мероприятие',
        description: 'Финальный аккорд. Мы не просто организуем событие, мы создаем атмосферу и эмоции, которые остаются в памяти надолго.'
    }
]
