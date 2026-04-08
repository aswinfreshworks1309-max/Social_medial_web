import React, { useEffect, useState } from 'react'
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { Search, Send } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config/config';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

import { useSelector } from 'react-redux';

const Chat = () => {
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const user = useSelector((state) => state.user.user) || {};

    const filteredContacts = contacts.filter(contact => 
        contact.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (user._id) {
            socket.emit('join', user._id);
        }

        socket.on('receive_message', (newMessage) => {
            // Only update messages if user is chatting with the sender
            setMessages((prev) => {
                // If current open chat is with the sender or user is the sender
                if (selectedContact?._id === newMessage.senderId || user._id === newMessage.senderId) {
                   return [...prev, newMessage];
                }
                return prev;
            });
        });

        return () => {
            socket.off('receive_message');
        };
    }, [user._id, selectedContact]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(`${API_URL}/register?exclude=${user.email}`);
                setContacts(response.data.users);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContacts();
    }, [user.email]);

    const selectContact = async (contact) => {
        setSelectedContact(contact);
        try {
            // Fetch history
            const response = await axios.get(`${API_URL}/chat/history?user1=${user._id}&user2=${contact._id}`);
            setMessages(response.data.messages);
            
            // Clear notifications for this sender
            await axios.post(`${API_URL}/notification/clear-message`, {
                recipientId: user._id,
                senderId: contact._id
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleSend = async () => {
        if (!text.trim() || !selectedContact) return;
        try {
            const payload = {
                senderId: user._id,
                recipientId: selectedContact._id,
                senderName: `${user.firstName} ${user.lastName}`,
                text: text
            };
            await axios.post(`${API_URL}/chat/send`, payload);
            setMessages([...messages, { ...payload, createdAt: new Date().toISOString() }]);
            setText('');
        } catch (err) {
            console.error(err);
        }
    };

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
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className='w-full bg-[#5e606721] border border-gray-700 h-[45px] pl-11 pr-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#8798EEFF]'
                                />
                                <Search className='absolute top-3 left-3 text-gray-500' size={20} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            {filteredContacts.map((contact, index) => (
                                <div
                                    key={contact._id}
                                    onClick={() => selectContact(contact)}
                                    className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all ${selectedContact?._id === contact._id ? 'bg-[#8798EEFF] text-white' : 'hover:bg-[#5e606721]'}`}
                                >
                                    <div className='relative'>
                                        <div className='h-12 w-12 rounded-full bg-[#8798EEFF] flex items-center justify-center text-white font-bold'>
                                            {contact.firstName?.charAt(0)}
                                        </div>
                                    </div>
                                    <div className='flex-1 overflow-hidden'>
                                        <h3 className='font-semibold truncate'>{contact.firstName} {contact.lastName}</h3>
                                        <p className={`text-sm truncate ${selectedContact?._id === contact._id ? 'text-blue-100' : 'text-gray-400'}`}>{contact.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* Chat Window */}
                    <section className='flex-1 flex flex-col bg-black/10'>
                        {selectedContact ? (
                            <>
                                {/* Chat Header */}
                                <div className='p-6 border-b border-gray-700 flex items-center justify-between'>
                                    <div className='flex items-center gap-4'>
                                        <div className='h-12 w-12 rounded-full bg-[#8798EEFF] flex items-center justify-center text-white font-bold'>
                                            {selectedContact.firstName?.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className='font-bold text-lg'>{selectedContact.firstName} {selectedContact.lastName}</h3>
                                            <p className='text-xs text-green-400'>Available</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Messages Area */}
                                <div className='flex-1 p-6 overflow-y-auto flex flex-col gap-4'>
                                    {messages.map((msg, i) => (
                                        <div 
                                            key={i}
                                            className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-lg ${msg.senderId === user._id ? 'self-end bg-[#8798EEFF] rounded-tr-none text-white' : 'self-start bg-[#5e606721] border border-gray-700 rounded-tl-none text-white'}`}
                                        >
                                            <p>{msg.text}</p>
                                            <span className={`text-[10px] mt-1 block ${msg.senderId === user._id ? 'text-blue-100 text-right' : 'text-gray-400'}`}>
                                                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Input Area */}
                                <div className='p-6 border-t border-gray-700'>
                                    <div className='flex items-center gap-4 bg-[#5e606721] border border-gray-700 rounded-2xl p-2 pl-4'>
                                        <textarea
                                            value={text}
                                            onChange={(e) => setText(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                                            placeholder="Type your message..."
                                            className='flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-white placeholder:text-gray-500 resize-none py-2 h-10'
                                        />
                                        <button 
                                            onClick={handleSend}
                                            className='bg-[#8798EEFF] p-3 rounded-xl hover:bg-[#7687d6] transition-colors'
                                        >
                                            <Send size={20} className='text-white' />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className='flex-1 flex flex-col items-center justify-center text-gray-500'>
                                <Search size={64} className='mb-4 opacity-20' />
                                <p>Select a contact to start chatting</p>
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}

export default Chat
