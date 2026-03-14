import React from 'react'
import { location, post } from '../data/profile'
import profile from "../assets/profile.png";
import { Button } from '@mui/material';
import { User, MessageCircle, Heart } from 'lucide-react'
import { image } from '../data/profile'
import Header from '../components/Header';
import SideBar from '../components/SideBar';


const Profile = () => {

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
            <Header />
            <div className='flex'>
                <aside className='w-[20%]'>
                    <SideBar />
                </aside>

                <main className='flex-1 ml-[10px]'>
                    {/* Profile Header Section */}
                    <div className='max-w-5xl mx-auto px-6 py-8'>
                        <div className='flex justify-between items-start gap-16 mb-12'>
                            {/* Profile Image */}
                            <div className='flex-shrink-0'>
                                <div className='relative'>
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className='h-40 w-40 rounded-full object-cover border-4 border-[#8798EEFF] shadow-2xl'
                                    />
                                    <div className='absolute bottom-3 right-3 w-5 h-5 bg-green-400 rounded-full border-2 border-white'></div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className='flex-1'>
                                <div className='flex items-baseline gap-4 mb-4'>
                                    <h1 className='text-3xl font-bold'>Felix Wanderer</h1>
                                    <span className='px-4 py-2 bg-[#8798EEFF] rounded-full text-sm font-semibold hover:bg-teal-600 transition cursor-pointer'>
                                        Verified
                                    </span>
                                </div>

                                <p className='text-xl text-gray-300 mb-6'>Creative Director & Visual Storyteller</p>

                                {/* Stats */}
                                <div className='flex gap-12 mb-6'>
                                    {post.map((stat, i) => (
                                        <div key={i} className='text-center'>
                                            <p className='text-2xl font-bold text-white'>{stat.no}</p>
                                            <p className='text-gray-400 text-sm uppercase tracking-wider'>{stat.post}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Location Info */}
                                <div className='flex items-center gap-6 text-gray-400 text-sm mb-6'>
                                    <div className='flex gap-2'>
                                        {location.map((item, i) => (
                                            <span key={i} className='flex items-center gap-1 hover:text-[#8798EEFF] transition cursor-pointer'>
                                                {item}
                                                {i < location.length - 1 && <span>•</span>}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className='flex gap-4'>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#8798EEFF',
                                            color: '#8798EEFF',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            padding: '8px 24px',
                                            '&:hover': {
                                                borderColor: '#8798EEFF',
                                                backgroundColor: '#8798EEFF',
                                                color:'white'
                                            }
                                        }}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            background: '#8798EEFF',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            padding: '8px 24px',
                                            '&:hover': {
                                                color: '#8798EEFF',
                                                borderColor: '#8798EEFF',                
                                                backgroundColor: 'transparent',
                                            }
                                        }}
                                    >
                                        <User className='w-5 h-5 mr-2' />
                                        Follow
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{
                                            borderColor: '#666',
                                            color: '#fff',
                                            textTransform: 'none',
                                            fontSize: '16px',
                                            padding: '8px 20px',
                                            '&:hover': {
                                                borderColor: '#999'
                                            }
                                        }}
                                    >
                                        <MessageCircle className='w-5 h-5' />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className='border-t border-gray-700 pt-8 mb-8'>
                            <h3 className='text-lg font-semibold mb-3'>About Me</h3>
                            <p className='text-gray-400 leading-relaxed max-w-2xl'>
                                Architectural Photographer & Visual Storyteller. Exploring the intersection of light and structure.
                                Based in New York City. 📍 Available for collaborations and commissioned work.
                            </p>
                        </div>

                        {/* Posts Section */}
                        <div className='border-t border-gray-700 pt-6'>
                            <h3 className='text-lg font-semibold mb-8'>Posts</h3>

                            {/* Posts Grid */}
                            <div className='grid grid-cols-3 gap-4 pb-12'>
                                {image.map((img, i) => (
                                    <div
                                        key={i}
                                        className='group relative overflow-hidden rounded-lg aspect-square cursor-pointer'
                                    >
                                        <img
                                            src={img}
                                            alt={`Post ${i + 1}`}
                                            className='w-full h-full object-cover group-hover:scale-105 transition duration-300'
                                        />
                   
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Profile
