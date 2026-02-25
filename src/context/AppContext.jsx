import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

    useEffect(() => {
        localStorage.setItem('lang', lang)
        document.documentElement.lang = lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.style.fontFamily = lang === 'ar'
            ? "'Cairo', 'Inter', system-ui, sans-serif"
            : "'Inter', system-ui, sans-serif"
    }, [lang])

    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)
    }, [theme])

    const toggleLang = () => setLang(l => l === 'en' ? 'ar' : 'en')
    const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

    return (
        <AppContext.Provider value={{ lang, theme, toggleLang, toggleTheme }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => useContext(AppContext)
