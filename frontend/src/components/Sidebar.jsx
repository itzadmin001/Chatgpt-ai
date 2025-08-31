import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChatListItem from './ChatListItem'
import { logout } from '../store/authSlice'
import { VscClose } from "react-icons/vsc";
import axios from "axios"
import { addChatTitle, setActiveChat } from '../store/chatSlice';
import { Allmessage } from '../store/MessageSlice';




export default function Sidebar({ openSidebar, SetopenSidebar }) {
    const dispatch = useDispatch()
    const { chats, activeChatId } = useSelector(state => state.chat);
    const active = useSelector((s) => s.chat.activeChatId)
    const user = useSelector((s) => s.user.user)



    const GetAllMessageHandler = (id) => {
        console.log(id)
        axios.get("https://chatgpt-ai-v21u.onrender.com/message/" + id, {
            withCredentials: true
        })
            .then((success) => {
                console.log(success)
                dispatch(Allmessage(success.data.messages))
            }).catch((err) => {
                console.log(err)
            })

    }


    const CreateChatHandler = () => {
        const chatname = prompt("Enter title")
        if (!chatname) {
            return alert("please give a title")
        }

        axios.post("https://chatgpt-ai-v21u.onrender.com/chat", { email: user.email, title: chatname }, {
            withCredentials: true
        })
            .then((success) => {
                console.log(success)
                dispatch(addChatTitle(success.data.chat))
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <aside className={`
    fixed md:static top-0 left-0 h-[100vh]
    w-[70%] md:w-80 px-4 py-6 z-50
    bg-slate-900 text-white flex flex-col gap-4
    transform transition-transform duration-500 ease-in-out
    ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
  `}>
            <div className="flex items-center justify-between overflow-hidden mb-10">
                <div className=''>
                    <h1 className="md:text-xl font-bold">ChatGPT Clone</h1>
                    <p className="text-xs text-slate-300">{user ? `Hi, ${user?.fullname.firstname + " " + user?.fullname.lastname}` : 'Welcome'}</p>
                </div>
                <div>
                    <button
                        className="bg-indigo-500 px-3 py-1 rounded-md text-sm hover:bg-indigo-600"
                        onClick={CreateChatHandler}
                    >
                        + New
                    </button>
                </div>
            </div>

            <div className=" flex-1 overflow-auto space-y-2 mb-5">
                {chats.length === 0 && <div className="text-slate-300 text-sm">No chats yet — start a new conversation.</div>}
                {chats.map((c) => (
                    <ChatListItem key={c._id} chat={c} active={c._id === active} onClick={() => {
                        dispatch(setActiveChat(c._id))
                        GetAllMessageHandler(c._id)
                        SetopenSidebar(false)
                    }}
                    />
                ))}
            </div>

            <div className='md:hidden block text-2xl mt-10 cursor-pointer ' onClick={() => SetopenSidebar(false)}>
                <VscClose className=' w-full text-center 2xl' />
            </div>
            <div className="flex items-center gap-2 cursor-pointer">
                <button className="flex-1 bg-slate-700/50 py-2 rounded-md text-sm" onClick={() => dispatch(logout())}>
                    Logout
                </button>
            </div>

        </aside>
    )
}
