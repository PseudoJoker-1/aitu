
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
    titleKey?: string;
    descriptionKey?: string;
    description: string;
    image: string;
    images?: ProjectImage[];
    content?: string;
    created_at?: string;
}


export interface Service {
    id: string;
    title: string;
    titleKey: string;
    image: string;
    description?: string;
}

export interface ProcessStep {
    number: string;
    title: string;
    titleKey: string;
    description: string;
    descriptionKey: string;
}

export const projects: Project[] = [
    {
        id: "corporate-forum",
        number: "01",
        title: "Корпоративный форум",
        titleKey: "portfolio.corporateForum",
        descriptionKey: "portfolio.corporateForumDesc",
        description: "Масштабное мероприятие для 500+ участников с интерактивными зонами, выступлениями спикеров мирового уровня и networking-сессиями.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание корпоративного форума..."
    },
    {
        id: "music-festival",
        number: "02",
        title: "Музыкальный фестиваль",
        titleKey: "portfolio.musicFestival",
        descriptionKey: "portfolio.musicFestivalDesc",
        description: "Трехдневный open-air с участием 50+ артистов, фуд-кортами и арт-инсталляциями на территории более 10 гектаров.",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание музыкального фестиваля..."
    },
    {
        id: "wedding-celebration",
        number: "03",
        title: "Свадебное торжество",
        titleKey: "portfolio.weddingCelebration",
        descriptionKey: "portfolio.weddingCelebrationDesc",
        description: "Эксклюзивная свадьба в исторической усадьбе с персонализированным декором, живой музыкой и авторским меню.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание свадебного торжества..."
    },
    {
        id: "business-conference",
        number: "04",
        title: "Бизнес-конференция",
        titleKey: "portfolio.businessConference",
        descriptionKey: "portfolio.businessConferenceDesc",
        description: "Международная конференция с синхронным переводом, онлайн-трансляцией и интерактивными воркшопами.",
        image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=1000&auto=format&fit=crop",
        content: "Полное описание бизнес-конференции..."
    },
]

export const services: Service[] = [
    {
        id: "festivals",
        title: "Концерты",
        titleKey: "services.festivals",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "corporate",
        title: "Новогодние корпоративы",
        titleKey: "services.corporate",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "conferences",
        title: "Конференции",
        titleKey: "services.conferences",
        image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "exhibitions",
        title: "Выставки",
        titleKey: "services.exhibitions",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "teambuilding",
        title: "Тимбилдинги",
        titleKey: "services.teambuilding",
        image: "/images/services/teambuilding.jpg",
    },
    {
        id: "car-presentation",
        title: "Презентация автомобилей",
        titleKey: "services.carPresentation",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "dealership-opening",
        title: "Открытие дилерских центров",
        titleKey: "services.dealershipOpening",
        image: "/images/services/dealership-opening.jpg",
    },
    {
        id: "birthdays",
        title: "День рождения",
        titleKey: "services.birthdays",
        image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "weddings",
        title: "Свадьбы",
        titleKey: "services.weddings",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "kyz-uzatu",
        title: "Кыз узату",
        titleKey: "services.kyzUzatu",
        image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop",
    },
]

export const processSteps: ProcessStep[] = [
    {
        number: '01',
        title: 'Звонок и бриф',
        titleKey: 'process.step1Title',
        description: 'Мы начинаем с глубокого погружения в ваши задачи. Изучаем аудиторию, анализируем контекст и формируем четкое видение целей вашего события.',
        descriptionKey: 'process.step1Desc',
    },
    {
        number: '02',
        title: 'Встреча и детали мероприятия',
        titleKey: 'process.step2Title',
        description: 'На основе встречи мы обсуждаем все детали мероприятия и формируем четкое видение целей вашего события.',
        descriptionKey: 'process.step2Desc',
    },
    {
        number: '03',
        title: 'Коммерческое предложение и смета',
        titleKey: 'process.step3Title',
        description: 'Мы формируем детальное предложение после встречи, включающее визуализацию идей, смету и таймлайны.',
        descriptionKey: 'process.step3Desc',
    },
    {
        number: '04',
        title: 'Составление договора',
        titleKey: 'process.step4Title',
        description: 'Мы готовим договор и отправляем вам на ознакомление.',
        descriptionKey: 'process.step4Desc',
    },
    {
        number: '05',
        title: 'Идеальное мероприятие',
        titleKey: 'process.step5Title',
        description: 'Финальный аккорд. Мы не просто организуем событие, мы создаем атмосферу и эмоции, которые остаются в памяти надолго.',
        descriptionKey: 'process.step5Desc',
    }
]
