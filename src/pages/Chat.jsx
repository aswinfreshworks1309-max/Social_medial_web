import React, { useState } from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { Search, Send } from 'lucide-react';
import { contacts } from '../data/chat.js';
import chat_1 from '../assets/chat_1.png'

const Chat = () => {
    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
            <Header />
            <div className='flex'>
                <aside className='w-[20%]'>
                    <SideBar />
                </aside>

                <main className='flex-1 flex h-[calc(100vh-80px)]'>
                    {/* Contacts List */}
                    <aside className='w-[350px] border-r border-gray-700 p-6 flex flex-col gap-6 overflow-y-auto'>
                        <div className='flex flex-col gap-6'>
                            <h1 className='text-2xl font-bold'>Messages</h1>
                            <div className='relative'>
                                <input
                                    type="text"
                                    placeholder='Search messages...'
                                    className='w-full bg-[#5e606721] border border-gray-700 h-[45px] pl-11 pr-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8798EEFF]'
                                />
                                <Search className='absolute top-3 left-3 text-gray-500' size={20} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            {contacts.map((contact, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${index === 0 ? 'bg-[#8798EEFF] text-white' : 'hover:bg-[#5e606721]'}`}
                                >
                                    <div className='relative'>
                                        <img src={contact.image} alt={contact.name} className='h-12 w-12 rounded-full object-cover' />
                                        <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900'></div>
                                    </div>
                                    <div className='flex-1 overflow-hidden'>
                                        <h3 className='font-semibold truncate'>{contact.name}</h3>
                                        <p className={`text-sm truncate ${index === 0 ? 'text-blue-100' : 'text-gray-400'}`}>{contact.lastMessage}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Chat Window */}
                    <section className='flex-1 flex flex-col bg-black/10'>
                        {/* Chat Header */}
                        <div className='p-6 border-b border-gray-700 flex items-center justify-between'>
                            <div className='flex items-center gap-4'>
                                <img src={chat_1} alt="Current contact" className='h-12 w-12 rounded-full object-cover' />
                                <div>
                                    <h3 className='font-bold text-lg'>John Doe</h3>
                                    <p className='text-xs text-green-400'>Online</p>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div className='flex-1 p-6 overflow-y-auto flex flex-col gap-4'>
                            <div className='max-w-[70%] self-end bg-[#8798EEFF] px-5 py-3 rounded-2xl rounded-tr-none text-white shadow-lg'>
                                <p>Hey! How's the project going?</p>
                                <span className='text-[10px] text-blue-100 mt-1 block text-right'>10:45 AM</span>
                            </div>

                            <div className='max-w-[70%] self-start bg-[#5e606721] border border-gray-700 px-5 py-3 rounded-2xl rounded-tl-none text-white shadow-lg'>
                                <p>It's coming along great! Just finished the notification module.</p>
                                <span className='text-[10px] text-gray-400 mt-1 block'>10:47 AM</span>
                            </div>

                            <div className='max-w-[70%] self-end bg-[#8798EEFF] px-5 py-3 rounded-2xl rounded-tr-none text-white shadow-lg'>
                                <p>Perfect! Can't wait to see the final version. 🔥</p>
                                <span className='text-[10px] text-blue-100 mt-1 block text-right'>10:48 AM</span>
                            </div>
                        </div>

                        {/* Input Area */}
                        <div className='p-6 border-t border-gray-700'>
                            <div className='flex items-center gap-4 bg-[#5e606721] border border-gray-700 rounded-2xl p-2 pl-4'>
                                <textarea
                                    placeholder="Type your message..."
                                    className='flex-1 bg-transparent border-none focus:ring-0 text-white placeholder:text-gray-500 resize-none py-2 h-10'
                                />
                                <button className='bg-[#8798EEFF] p-3 rounded-xl hover:bg-[#7687d6] transition-colors'>
                                    <Send size={20} className='text-white' />
                                </button>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Chat
