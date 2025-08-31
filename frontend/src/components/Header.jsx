import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="w-full p-4 flex items-center justify-between bg-transparent">
            <Link to="/" className="text-2xl font-bold text-white">ChatGPT Clone</Link>
            <div>
                <Link to="/try" className="px-4 py-2 rounded-md bg-white/10 text-white hover:bg-white/20">Try it</Link>
            </div>
        </header>
    )
}
