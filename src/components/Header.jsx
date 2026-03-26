import React from 'react'
import { Search, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import profile from '../assets/profile.png'



const Header = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};

    return (
        <div className='flex justify-between border-b border-gray-700 h-[80px] items-center bg-[#5e606721] backdrop-blur-md sticky top-0 z-50 px-8'>
            <div className='flex gap-12 items-center'>
                <h1 className='text-3xl font-bold text-[#8798EEFF] cursor-pointer tracking-tight'>ConnectHub</h1>
                <div className='relative hidden md:block'>
                    <input
                        type="text"
                        placeholder='Search people or posts...'
                        className='border border-gray-600 p-2 rounded-xl pl-10 placeholder:text-gray-500 w-[300px] text-white bg-black/20 focus:outline-none focus:border-[#8798EEFF] transition-all'
                    />
                    <Search className='absolute top-2.5 left-3 text-gray-500' size={18} />
                </div>
            </div>

            <div className='flex gap-6 items-center'>
                <Link to="/notification" className='flex relative cursor-pointer group p-2 rounded-full hover:bg-gray-700/50 transition'>
                    <Bell size={24} className="text-gray-300 group-hover:text-white transition-colors" />
                    <div className='h-3 w-3 bg-red-600 rounded-full absolute top-1.5 right-1.5 border-2 border-gray-900'></div>
                </Link>

                <div className='flex items-center gap-3 cursor-pointer group'>
                    <div className='text-right hidden sm:block'>
                        <p className='text-sm font-bold leading-tight group-hover:text-[#8798EEFF] transition-colors'>{user.firstName || 'User'} {user.lastName || ''}</p>
                        <p className='text-[10px] text-gray-500 uppercase tracking-tighter'>Member</p>
                    </div>
                    <div className='w-12 h-12 flex justify-center items-center overflow-hidden relative rounded-2xl bg-[#8798EE] font-bold text-white border-2 border-gray-600 shadow-lg group-hover:border-[#8798EEFF] transition-all'>
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
