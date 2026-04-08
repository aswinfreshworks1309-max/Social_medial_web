import React, { useState, useEffect } from 'react'
import { Search, Bell, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import profile from '../assets/profile.png'
import { io } from 'socket.io-client'
import axios from 'axios'
import { API_URL } from '../config/config'

import { useSelector } from 'react-redux'

const Header = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [results, setResults] = useState([])
    const [showResults, setShowResults] = useState(false)
    const [unreadCount, setUnreadCount] = useState(0)
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user) || {};

    useEffect(() => {
        const socket = io('http://localhost:4000');
        if (user._id) {
            socket.emit('join', user._id);
            
            // Initial fetch
            const fetchUnread = async () => {
                try {
                    const response = await axios.get(`${API_URL}/notification/user/${user._id}`);
                    const unread = response.data.notification.filter(n => !n.isRead).length;
                    setUnreadCount(unread);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchUnread();
        }

        socket.on('receive_notification', () => {
            setUnreadCount(prev => prev + 1);
        });

        return () => socket.disconnect();
    }, [user._id]);

    useEffect(() => {
        const fetchResults = async () => {
            if (searchTerm.trim().length > 1) {
                try {
                    const response = await axios.get(`${API_URL}/register?search=${searchTerm}&exclude=${user.email}`)
                    setResults(response.data.users)
                    setShowResults(true)
                } catch (err) {
                    console.error(err)
                }
            } else {
                setResults([])
                setShowResults(false)
            }
        }

        const timer = setTimeout(fetchResults, 300)
        return () => clearTimeout(timer)
    }, [searchTerm])

    return (
        <div  className='flex sticky top-0 z-50 justify-between border-b border-gray-700 h-[80px] items-center bg-black/80 border-b border-gray-800'>
            <div className='flex gap-12 items-center'>
                <h1 onClick={() => navigate('/dashboard')} className=' ml-8 text-3xl font-bold text-[#5DD3B6] cursor-pointer tracking-tight'>ConnectHub</h1>
                <div className='relative hidden md:block'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm.length > 1 && setShowResults(true)}
                        placeholder='Search people or posts...'
                        className='border border-gray-600 p-2 rounded-xl pl-10 placeholder:text-gray-500 w-[300px] text-white bg-black/20 focus:outline-none focus:border-[#5DD3B6] transition-all'
                    />
                    <Search className='absolute top-2.5 left-3 text-gray-500' size={18} />

                    {/* Search Results Dropdown */}
                    {showResults && results.length > 0 && (
                        <div className='absolute top-full left-0 w-full bg-[#1a1c23] border border-gray-700 mt-2 rounded-xl shadow-2xl overflow-hidden z-[100] max-h-[400px] overflow-y-auto'>
                            {results.map((res) => (
                                <div 
                                    key={res._id}
                                    onClick={() => {
                                        navigate(`/profile/${res._id}`)
                                        setShowResults(false)
                                        setSearchTerm('')
                                    }}
                                    className='flex items-center gap-3 p-3 hover:bg-[#5DD3B6]/10 cursor-pointer border-b border-gray-800 transition-colors'
                                >
                                    <div className='w-10 h-10 rounded-full bg-[#8798EE] flex items-center justify-center font-bold text-white shrink-0 overflow-hidden'>
                                        {res.avatar ? (
                                            <img src={res.avatar} alt={res.firstName} className='w-full h-full object-cover' />
                                        ) : (
                                            <span>{res.firstName?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className='flex flex-col min-w-0'>
                                        <p className='text-sm font-bold text-gray-100 truncate'>{res.firstName} {res.lastName}</p>
                                        <p className='text-[10px] text-gray-500 truncate'>{res.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {showResults && results.length === 0 && searchTerm.length > 1 && (
                        <div className='absolute top-full left-0 w-full bg-[#1a1c23] border border-gray-700 mt-2 rounded-xl p-4 text-center text-gray-500 text-sm italic'>
                            No users found for "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>

            <div className='flex gap-6 items-center'>
                <Link to="/notification" className='flex relative cursor-pointer group p-2 rounded-full hover:bg-gray-700/50 transition'>
                    <Bell size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                    {unreadCount > 0 && (
                        <div className='h-[18px] min-w-[18px] px-1 bg-red-600 rounded-full absolute top-1 right-1 border-2 border-gray-900 flex items-center justify-center text-[10px] text-white font-bold animate-pulse'>
                            {unreadCount}
                        </div>
                    )}
                </Link>

                <div onClick={() => navigate('/profile')} className='flex items-center gap-3 cursor-pointer group mr-8'>
                    <div className='text-right hidden sm:block'>
                        <p className='text-sm font-bold leading-tight group-hover:text-[#5DD3B6] transition-colors'>{user.firstName || 'User'} {user.lastName || ''}</p>
                        <p className='text-[10px] text-gray-500 uppercase tracking-tighter'>Member</p>
                    </div>
                    <div className='w-12 h-12 flex justify-center items-center overflow-hidden relative rounded-2xl bg-[#8798EE] font-bold text-white border-2 border-gray-600 shadow-lg group-hover:border-[#5DD3B6] transition-all'>
                        {user.avatar ? (
                            <img src={user.avatar} alt="Profile" className='h-full w-full object-cover' />
                        ) : (
                            <span>{user.firstName ? user.firstName.charAt(0) : 'U'}</span>
                        )}
                        <div className='bg-green-500 h-3 w-3 rounded-full absolute bottom-0 right-0 border-2 border-gray-900'></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
