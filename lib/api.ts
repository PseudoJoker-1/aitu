// API Configuration and Utilities

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

// Types matching Django models
export interface ProjectImage {
    id: number;
    image: string;
    caption: string;
    order: number;
}

export interface Project {
    id: number;
    title: string;
    slug: string;
    description: string;
    images: ProjectImage[];
    created_at: string;
}

export interface Lead {
    name: string;
    phone?: string;
    email?: string;
    event_type?: string;
    message?: string;
}

// Fetch all projects
export async function getProjects(): Promise<Project[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });
        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

// Fetch single project by slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${slug}/`, {
            next: { revalidate: 60 },
        });
        if (!response.ok) {
            return null;
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

// Get full image URL
export function getImageUrl(imagePath: string): string {
    if (imagePath.startsWith('http')) {
        return imagePath;
    }
    return `${API_BASE_URL}${imagePath}`;
}

// Submit lead (contact form)
export async function submitLead(lead: Lead): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/leads/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(lead),
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, message: data.message || 'Спасибо! Мы свяжемся с вами.' };
        }

        return { success: false, message: 'Произошла ошибка. Попробуйте позже.' };
    } catch (error) {
        console.error('Error submitting lead:', error);
        return { success: false, message: 'Ошибка сети. Проверьте подключение.' };
    }
}
