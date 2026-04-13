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
        <header  className='flex sticky top-0 z-50 justify-between border-b border-theme-border h-[80px] items-center bg-theme-bg/80 backdrop-blur-md'>
            <div className='flex gap-12 items-center'>
                <h1 onClick={() => navigate('/dashboard')} className=' ml-8 text-3xl font-bold text-theme-accent cursor-pointer tracking-tight'>ConnectHub</h1>
                <div className='relative hidden md:block'>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm.length > 1 && setShowResults(true)}
                        placeholder='Search people or posts...'
                        className='border border-theme-border p-2 rounded-xl pl-10 placeholder:text-theme-text-muted w-[300px] text-theme-text bg-theme-card focus:outline-none focus:border-theme-accent transition-all'
                    />
                    <Search className='absolute top-2.5 left-3 text-theme-text-muted' size={18} />

                    {/* Search Results Dropdown */}
                    {showResults && results.length > 0 && (
                        <div className='absolute top-full left-0 w-full bg-theme-card border border-theme-border mt-2 rounded-xl shadow-2xl overflow-hidden z-[100] max-h-[400px] overflow-y-auto'>
                            {results.map((res) => (
                                <div 
                                    key={res._id}
                                    onClick={() => {
                                        navigate(`/profile/${res._id}`)
                                        setShowResults(false)
                                        setSearchTerm('')
                                    }}
                                    className='flex items-center gap-3 p-3 hover:bg-theme-accent/10 cursor-pointer border-b border-theme-divider transition-colors'
                                >
                                    <div className='w-10 h-10 rounded-full bg-theme-accent flex items-center justify-center font-bold text-white shrink-0 overflow-hidden'>
                                        {res.avatar ? (
                                            <img src={res.avatar} alt={res.firstName} className='w-full h-full object-cover' />
                                        ) : (
                                            <span className='text-white'>{res.firstName?.charAt(0) || "U"}</span>
                                        )}
                                    </div>
                                    <div className='flex flex-col min-w-0'>
                                        <p className='text-sm font-bold text-theme-text truncate'>{res.firstName} {res.lastName}</p>
                                        <p className='text-[10px] text-theme-text-muted truncate'>{res.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {showResults && results.length === 0 && searchTerm.length > 1 && (
                        <div className='absolute top-full left-0 w-full bg-theme-card border border-theme-border mt-2 rounded-xl p-4 text-center text-theme-text-muted text-sm italic'>
                            No users found for "{searchTerm}"
                        </div>
                    )}
                </div>
            </div>

            <div className='flex gap-6 items-center'>
                <Link to="/notification" className='flex relative cursor-pointer group p-2 rounded-full hover:bg-theme-accent/10 transition'>
                    <Bell size={24} className="text-theme-text-muted group-hover:text-theme-accent transition-colors" />
                    {unreadCount > 0 && (
                        <div className='h-[18px] min-w-[18px] px-1 bg-red-600 rounded-full absolute top-1 right-1 border-2 border-theme-bg flex items-center justify-center text-[10px] text-white font-bold animate-pulse'>
                            {unreadCount}
                        </div>
                    )}
                </Link>

                <div onClick={() => navigate('/profile')} className='flex items-center gap-3 cursor-pointer group mr-8'>
                    <div className='text-right hidden sm:block'>
                        <p className='text-sm font-bold leading-tight group-hover:text-theme-accent transition-colors'>{user.firstName || 'User'} {user.lastName || ''}</p>
                        <p className='text-[10px] text-theme-text-muted uppercase tracking-tighter'>Member</p>
                    </div>
                    <div className='w-12 h-12 flex justify-center items-center overflow-hidden relative rounded-2xl bg-theme-accent font-bold text-black border-2 border-theme-border shadow-lg group-hover:border-theme-accent transition-all'>
                        {user.avatar ? (
                            <img src={user.avatar} alt="Profile" className='h-full w-full object-cover' />
                        ) : (
                            <span className='text-white'>{user.firstName ? user.firstName.charAt(0) : 'U'}</span>
                        )}
                        <div className='bg-green-500 h-3 w-3 rounded-full absolute bottom-0 right-0 border-2 border-theme-bg'></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
