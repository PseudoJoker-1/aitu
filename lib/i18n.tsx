'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations, type Locale, localeNames } from './translations'

interface I18nContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('ru')
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem('locale') as Locale | null
        if (saved && translations[saved]) {
            setLocaleState(saved)
        }
        setMounted(true)
    }, [])

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale)
        localStorage.setItem('locale', newLocale)
    }, [])

    const t = useCallback((key: string): string => {
        const value = translations[locale]?.[key]
        if (typeof value === 'string') return value
        // Fallback to Russian, then to key
        const fallback = translations['ru']?.[key]
        if (typeof fallback === 'string') return fallback
        return key
    }, [locale])

    // Prevent hydration mismatch by rendering with default locale until mounted
    const contextValue = React.useMemo(() => ({
        locale: mounted ? locale : 'ru' as Locale,
        setLocale,
        t: mounted ? t : (key: string) => {
            const value = translations['ru']?.[key]
            return typeof value === 'string' ? value : key
        },
    }), [locale, setLocale, t, mounted])

    return (
        <I18nContext.Provider value={contextValue}>
            {children}
        </I18nContext.Provider>
    )
}

export function useTranslation() {
    const context = useContext(I18nContext)
    if (!context) {
        throw new Error('useTranslation must be used within a LanguageProvider')
    }
    return context
}

export { type Locale, localeNames }
