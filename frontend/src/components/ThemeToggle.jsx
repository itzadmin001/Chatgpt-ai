import React, { useEffect, useState } from 'react'

export default function ThemeToggle() {
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('cg_theme') || 'system'
        } catch {
            return 'system'
        }
    })

    useEffect(() => {
        const apply = (t) => {
            const el = document.documentElement
            if (t === 'dark') {
                el.classList.add('dark')
            } else if (t === 'light') {
                el.classList.remove('dark')
            } else {
                // system
                const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
                if (prefers) el.classList.add('dark')
                else el.classList.remove('dark')
            }
        }

        apply(theme)
    }, [theme])

    useEffect(() => {
        const mq = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = () => {
            if (theme === 'system') {
                if (mq.matches) document.documentElement.classList.add('dark')
                else document.documentElement.classList.remove('dark')
            }
        }
        mq.addEventListener ? mq.addEventListener('change', handler) : mq.addListener(handler)
        return () => {
            mq.removeEventListener ? mq.removeEventListener('change', handler) : mq.removeListener(handler)
        }
    }, [theme])

    const toggle = () => {
        const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
        setTheme(next)
        try { localStorage.setItem('cg_theme', next) } catch { }
    }

    return (
        <button
            onClick={toggle}
            className="ml-3 px-3 py-2 rounded-md bg-white/5 hover:bg-white/10 text-sm text-white"
            title="Toggle theme (cycles: dark → light → system)"
        >
            {theme === 'dark' && '🌙 Dark'}
            {theme === 'light' && '☀️ Light'}
            {theme === 'system' && '🖥️ System'}
        </button>
    )
}
