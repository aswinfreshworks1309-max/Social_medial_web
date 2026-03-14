import React, { useState } from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { Search, Send } from 'lucide-react';
import { contacts } from '../data/chat.js';
import chat_1 from '../assets/chat_1.png'

const Chat = () => {

    const [white, setWhite] = useState(true);
    return (
        <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            <Header />
            <div className='flex '    >

                <aside>
                    <SideBar />
                </aside>
                <hr />
                <aside className='border-[1px] border-gray-400 p-5 rounded-lg'>
                    <div>
                        <div className='flex flex-col gap-10'>
                            <h1 className='text-[20px] mt-4 text-white'>Message</h1>
                            <div className='relative'>
                                <input type="text" placeholder='Search Messages...' className='border-2 border-white h-[40px] w-[300px] pl-[40px] rounded-2xl placeholder:text-gray-400' />
                                <Search className='absolute  top-2 left-2 text-white' />
                            </div>
                        </div>
                    </div>

                    {
                        contacts.map((contact, index) => (

                            <div key={index} className='flex items-center gap-3 p-2 hover:bg-[#8798EEFF] rounded-lg mt-5 cursor-pointer bg-gray-300'>
                                <img src={contact.image} alt={contact.name} className='h-[56px] w-[56px] rounded-full object-cover' />
                                <div>
                                    <h1>{contact.name}</h1>
                                    <p>{contact.lastMessage}</p>

                                </div>
                            </div>
                        ))
                    }
                </aside>

                <div className='h-[87vh] w-full border-right-[1px] '>
                    <div className='w-full h-[80px] border-[1px]  flex items-center gap-5 rounded-lg  border-gray-400 '>
                        <img src={chat_1} alt="profile image" className='h-[56px] w-[56px] rounded-full ml-5' />
                        <div>
                            <h1 className='font-bold text-2xl text-white'>John Doe</h1>
                            <p className='text-sm text-gray-400 '>Online</p>
                        </div>
                    </div>

                    <div className='w-full h-[80vh] relative p-5'>
                        <div>

                            <div className='w-[40%] h-[40px] bg-[#8798EEFF] rounded-2xl flex justify-center items-center text-black ml-auto mt-5'>Hello, how are you?</div>
                            <div className='w-[40%] h-[40px] bg-gray-300 rounded-2xl flex justify-center items-center text-black mt-5'>I am good, thanks for asking!</div>


                        </div>
                        <div className='absolute bottom-10 flex gap-5 items-center'>

                            <textarea name="Enter your text here" placeholder="Type your message..." className='border-2 border-gray-400 h-[60px] w-[700px] pl-[40px] rounded-2xl placeholder:text-gray-400 pt-4' />
                            <div className='h-[50px] w-[70px] bg-[#8798EEFF] rounded-2xl flex justify-center items-center'>

                                <Send size={35} className='cursor-pointer' />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Chat
