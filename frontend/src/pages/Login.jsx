import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../store/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import { MainContext } from '../ContextMain'

export default function Login() {
    const { notify } = useContext(MainContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const submit = (e) => {
        e.preventDefault()
        axios.post("https://chatgpt-ai-v21u.onrender.com/user/login", { email, password }, {
            withCredentials: true
        })
            .then((success) => {
                notify(success.data.message, "success")
                dispatch(loginSuccess(success.data.user))
                navigate('/app')
            }).catch((err) => {
                notify(err.response?.data?.message || "Please Try Again Later", "error")
            })


    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 to-slate-900 p-4">
            <form onSubmit={submit} className="w-full max-w-md bg-slate-800/70 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl text-white font-semibold mb-4">Sign in</h2>
                <label className="block text-sm text-slate-300">Email</label>
                <input className="w-full p-2 rounded-md bg-slate-700 text-white mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="block text-sm text-slate-300">Password</label>
                <input type="password" className="w-full p-2 rounded-md bg-slate-700 text-white mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full py-2 bg-indigo-500 rounded-md text-white cursor-pointer">Login</button>
                <p className="text-slate-300 text-sm mt-3">Don't have an account? <Link to="/register" className="text-indigo-300">Register</Link></p>
            </form>
        </div>
    )
}
