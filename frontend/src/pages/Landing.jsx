import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle'

export default function Landing() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center bg-animated p-6">
            <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white">AI Chat — Your personal assistant</h1>
                    <p className="mt-4 text-slate-300 text-lg">Powerful AI conversations, context-aware chats, and a simple interface inspired by ChatGPT. Start talking — get answers, summaries, code and more.</p>
                    <div className="mt-6">
                        <button onClick={() => navigate('/login')} className="px-10 py-3 rounded-md border-[1px]  border-gray-100 cursor-pointer  text-white font-medium">Try it</button>

                    </div>
                    <div className="mt-6 text-sm text-slate-400">Fast, private and secure. Switch theme with the button.</div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                    <div className="w-full p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/3">
                        <div className="bg-slate-900/60 p-4 rounded-lg">
                            <pre className="text-sm text-slate-200 select-none">{`User: How to center a div?
Assistant: Use flexbox or grid...`}</pre>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
