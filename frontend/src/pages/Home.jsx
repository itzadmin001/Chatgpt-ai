import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { AllChatsTitle } from '../store/chatSlice'
import socket from '../../Socket'
import { addOne } from '../store/MessageSlice'


export default function Home() {
    const user = useSelector((s) => s.user.user)


    const dispatch = useDispatch()
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (user) {
            axios.post("http://localhost:3000/chat/all", { email: user.email })
                .then((success) => {
                    dispatch(AllChatsTitle(success.data.chats))
                }).catch((err) => {
                    console.log(err)
                })
        }

    }, [user])



    useEffect(() => {
        const handler = (data) => {
            setIsTyping(false)
            const now = new Date().toISOString();
            data.createdAt = now,
                dispatch(addOne(data));

        };

        socket.on("ai-response", handler);

        // cleanup function
        return () => {
            socket.off("ai-response", handler);
        };
    }, []);


    const [openSidebar, SetopenSidebar] = useState(false)
    return (
        <div className="min-h-screen flex flex-col bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/40 to-slate-900">
            <div className="flex flex-1 ">
                <Sidebar openSidebar={openSidebar} SetopenSidebar={SetopenSidebar} />
                <div className=" w-full flex-1 p-0 md:p-6 flex flex-col">
                    <ChatWindow SetopenSidebar={SetopenSidebar} openSidebar={openSidebar} isTyping={isTyping} setIsTyping={setIsTyping} />
                </div>
            </div>
        </div>
    )
}
