import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import ChatInput from './ChatInput'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { IoMenu } from "react-icons/io5";
export default function ChatWindow({ SetopenSidebar, openSidebar, isTyping, setIsTyping }) {
    // support both _id and id for active chat
    const activeId = useSelector((s) => s.chat.activeChatId)
    const chat = useSelector((s) => s.chat.chats.find((c) => c._id === activeId || c.id === activeId))
    const message = useSelector((state) => state.message?.message || [])
    const messagesEndRef = useRef(null);
    const active = useSelector((s) => s.chat.activeChatId)



    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [message]);


    if (!active) {
        return (
            <div className=" flex-1 min-h-0 flex flex-col items-center justify-center text-slate-400 p:4">
                <div className='md:hidden absolute top-5 left-4 text-2xl cursor-pointer' onClick={() => SetopenSidebar(!openSidebar)}>
                    <IoMenu />
                </div>
                <h2 className="text-2xl font-semibold text-white">Welcome to ChatGPT Clone</h2>
                <p className="mt-2">Start a new chat or select one from the left.</p>
            </div>
        )
    }



    return (
        // Make parent flexible and allow children to shrink properly on mobile (min-h-0)
        <div className="max-w-full flex-1 min-h-0 flex flex-col">
            <header className=" w-full p-3 sm:p-4 border-b border-slate-700/50">
                <div className="flex items-center justify-between">
                    <div className='md:hidden text-2xl cursor-pointer' onClick={() => SetopenSidebar(!openSidebar)}>
                        <IoMenu />
                    </div>
                    <div className="flex flex-col ml-2 items-center justify-between">
                        <h3 className="text-lg text-white font-semibold truncate">{chat?.title}</h3>
                        <div className="text-sm text-slate-300">Model: {chat?.model}</div>
                    </div>
                </div>
            </header>


            <main className="flex-1 overflow-auto p-3 sm:p-6 space-y-3 sm:space-y-4 bg-gradient-to-b from-slate-900/0 to-slate-900/5">
                {message?.map((m, i) => (
                    <div
                        key={i}
                        className={`w-fit max-w-full sm:max-w-[80%] p-3 sm:p-4 rounded-2xl shadow-md break-words ${m.role === "user"
                            ? "ml-auto bg-indigo-600 text-white"
                            : "bg-slate-800 text-slate-100"
                            }`}
                    >
                        {/* Markdown render */}
                        <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    // Inline code
                                    code({ inline, className, children, ...props }) {
                                        if (inline) {
                                            return (
                                                <code
                                                    className="bg-slate-900/70 px-1 py-0.5 rounded text-slate-100 text-sm"
                                                    {...props}
                                                >
                                                    {children}
                                                </code>
                                            );
                                        }
                                        return <code className={className} {...props}>{children}</code>;
                                    },
                                    // Block code (<pre>)
                                    pre({ children }) {
                                        return (
                                            <pre className="overflow-x-auto rounded-lg bg-slate-900 p-3 text-sm text-slate-100 my-2">
                                                {children}
                                            </pre>
                                        );
                                    },
                                }}
                            >
                                {m.content || ""}
                            </ReactMarkdown>
                        </div>

                        {/* Time */}
                        <div className="text-xs text-slate-400 mt-2">
                            {new Date(m.createdAt).toLocaleTimeString()}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="w-fit p-3 sm:p-4 rounded-2xl shadow-md mt-10 bg-indigo-600 text-white flex items-center space-x-1">
                        <span className="dot animate-bounce bg-white w-2 h-2 rounded-full"></span>
                        <span className="dot animate-bounce bg-white w-2 h-2 rounded-full delay-150"></span>
                        <span className="dot animate-bounce bg-white w-2 h-2 rounded-full delay-300"></span>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </main>


            <div className="p-3 sm:p-4 border-t border-slate-700/50 flex-none">
                {/* pass id or _id to ChatInput */}
                <ChatInput chatId={chat?._id || chat?.id} setIsTyping={setIsTyping} />
            </div>
        </div>
    )
}