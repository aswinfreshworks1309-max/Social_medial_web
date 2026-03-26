import React from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { notifications } from '../data/notification'
import { Bell } from 'lucide-react'

function Notification(){


    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
            <Header />
            <div className='flex mt-[20px]'>
                <aside className='w-[20%]'>
                    <SideBar />
                </aside>

                <main className='flex-1 p-3'>
                    <div className='max-w-3xl mx-auto'>
                        <div className='flex items-center gap-3 mb-8'>
                            <Bell className="text-[#8798EEFF]" size={32} />
                            <h1 className='text-3xl font-bold'>Notifications</h1>
                        </div>

                        <div className='flex flex-col gap-4'>
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className='bg-[#5e606721] border border-gray-700 p-5 rounded-2xl flex items-center gap-4 hover:bg-[#5e60673a] transition cursor-pointer'
                                >
                                    <div className='h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center'>
                                        {<notif.icon/>}
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-gray-100'>
                                            <span className='font-bold text-[#8798EEFF]'>{notif.user}</span> {notif.content}
                                        </p>
                                        <p className='text-gray-500 text-sm mt-1'>{notif.time}</p>
                                    </div>
                                    <div className='h-2 w-2 bg-[#8798EEFF] rounded-full'></div>
                                </div>
                            ))}
                        </div>

                        {notifications.length === 0 && (
                            <div className='flex flex-col items-center justify-center py-20 text-gray-500'>
                                <Bell size={64} className='mb-4 opacity-20' />
                                <p>No new notifications yet.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Notification
