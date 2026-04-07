import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SideBar from '../components/SideBar'
import { notifications } from '../data/notification'
import { Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../config/config'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4000');

function Notification(){
    const [notification, setNotification] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const navigate = useNavigate();

    useEffect(() => {
        if (user._id) {
            socket.emit('join', user._id);
        }

        socket.on('receive_notification', (newNotif) => {
            setNotification(prev => [newNotif, ...prev]);
        });

        return () => {
            socket.off('receive_notification');
        };
    }, [user._id]);


    const fetchNotification = async () => {
        if (!user._id) return;
        try {
            const response = await axios.get(`${API_URL}/notification/user/${user._id}`);
            setNotification(response.data.notification)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchNotification()
    }, [user._id]);

    const markAsRead = async (id) => {
        try {
            await axios.put(`${API_URL}/notification/${id}/read`);
            setNotification(notification.map(n => 
                n._id === id ? { ...n, isRead: true } : n
            ));
        } catch (err) {
            console.log(err)
        };
    };

    const handleNotificationClick = async (notify) => {
        if (!notify.isRead) {
            await markAsRead(notify._id)
        } 
        if (notify.type === "message") {
            navigate('/chat')
        }
    }

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
                            {notification.map((notif) => (
                                <div
                                    key={notif._id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`bg-[#5e606721] border border-gray-700 p-5 rounded-2xl flex items-center gap-4 hover:bg-[#5e60673a] transition cursor-pointer ${notif.isRead ? 'opacity-60' : 'opacity-100'}`}
                                >
                                    <div className='h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center'>
                                        <Bell size={20} className="text-[#8798EEFF]" />
                                    </div>
                                    <div className='flex-1'>
                                        <p className='text-gray-100'>
                                            <span className='font-bold text-[#8798EEFF]'>{notif.senderName}</span> {notif.content}
                                        </p>
                                        <p className='text-gray-500 text-sm mt-1'>
                                            {new Date(notif.createdAt).toLocaleDateString()} at {new Date(notif.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                    {!notif.isRead && <div className='h-2 w-2 bg-[#8798EEFF] rounded-full'></div>}
                                </div>
                            ))}
                        </div>

                        {!loading && notification.length === 0 && (
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
