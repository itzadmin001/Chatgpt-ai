import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerSuccess } from '../store/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

export default function Register() {
    const [firstname, setFirstName] = useState('')
    const [lastname, setlastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = (e) => {
        e.preventDefault()
        axios.post("https://chatgpt-ai-v21u.onrender.com/user/create", { fullname: { firstname, lastname }, email, password }, {
            withCredentials: true
        })
            .then((success) => {
                notify(success.data.message, "success")
                dispatch(loginSuccess(success.data.user))
                setTimeout(() => {
                    navigate('/app');
                }, 2000);
            }).catch((err) => {
                console.log(err)
                notify(err.response.data.message, "error")
            })


    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-900 to-slate-900 p-4">
            <form onSubmit={submit} className="w-full max-w-md bg-slate-800/70 p-6 rounded-lg backdrop-blur-sm">
                <h2 className="text-2xl text-white font-semibold mb-4">Create account</h2>
                <label className="block text-sm text-slate-300">FistName</label>
                <input className="w-full p-2 rounded-md bg-slate-700 text-white mb-3" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                <label className="block text-sm text-slate-300">LastName</label>
                <input className="w-full p-2 rounded-md bg-slate-700 text-white mb-3" value={lastname} onChange={(e) => setlastName(e.target.value)} />
                <label className="block text-sm text-slate-300">Email</label>
                <input className="w-full p-2 rounded-md bg-slate-700 text-white mb-3" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label className="block text-sm text-slate-300">Password</label>
                <input type="password" className="w-full p-2 rounded-md bg-slate-700 text-white mb-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="w-full py-2 bg-indigo-500 rounded-md text-white cursor-pointer">Register</button>
                <p className="text-slate-300 text-sm mt-3">Already registered? <Link to="/login" className="text-indigo-300">Sign in</Link></p>
            </form>
        </div>
    )
}
