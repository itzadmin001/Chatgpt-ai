import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import socket from "../../Socket"
import { addOne } from '../store/MessageSlice'


export default function ChatInput({ chatId, setIsTyping }) {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const chat = useSelector((state) => state.chat.chats)


    const send = async () => {
        if (!text.trim()) return
        const now = new Date().toISOString();
        // user message
        const tempMessage = {
            chat: chatId,
            content: text,
            createdAt: now,
            role: "user",
        };

        socket.emit("ai-message", { chat: chatId, content: text })
        dispatch(addOne(tempMessage));
        setIsTyping(true)

        setText("");


        // setTimeout(() => {
        //     const reply = `Echo: ${text}`
        //     dispatch(addMessage({ chatId, message: { sender: 'assistant', text: reply, ts: Date.now() } }))
        // }, 800)
    }




    return (
        <div className="w-full flex gap-3 items-end">
            <textarea
                className="flex-1 p-3 rounded-md bg-slate-800 text-white placeholder:text-slate-400 resize-none h-14"
                placeholder="Type your message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                onClick={send}
                className="bg-indigo-500 cursor-pointer hover:bg-indigo-600 px-4 py-3 rounded-md text-white"
            >
                Send
            </button>
        </div>
    )
}
