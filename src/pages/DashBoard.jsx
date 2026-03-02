import React from 'react'
import {  MessageCircle, Heart, Share2 } from 'lucide-react'
import profile from '../assets/profile.png'
import Button from '@mui/material/Button'
import boy from '../assets/boy.png'
import {nav} from '../data/dashboard'


const DashBoard = () => {
    return (
        <div className='h-screen w-screen flex  gap-[20px] p-[20px] w-full ' >
            <aside className='flex gap-4 flex-col'>
                {nav.map((x,i) => (
                    
                <div key={i} className='flex gap-3 h-[50px] w-[200px] items-center border-[1px] border-black pl-2'>
                        <p>{ x.name}</p>
                        <h3>{ x.label}</h3>
                </div>
                ))}
       
            </aside>
            <div className='flex justify-start items-start flex-col w-full '>
                <div className='flex justify-start flex-col gap-5 w-full border-[1px] border-black p-[20px] rounded-[10px] h-[230px] '>
                    <div className='flex gap-5 justify-center items-center'>
                        <div className='h-[50px] w-[50px] rounded-full border-2 border-black relative'>
                            <img src={profile} alt="Profile" className='h-full w-full rounded-full object-cover' />
                            <div className='bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0'></div>
                        </div>

                        <input type="text" placeholder='What is on your mind ?' className='h-[50px] w-[500px] border-[1px] border-gray-500 p-[10px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />

                    </div> <br />
                    <hr />
                    <div className='flex justify-between items-center p-[10px]'>
                        <div className='flex gap-5'>

                            <Button variant='contained' className='bg-[#00C2B0FF]'>Photo</Button>
                            <div>Feeling/activity</div>
                        </div>
                        <Button variant="contained" color="success" className='bg-[#00C2B0FF] rounded-[10px]'>Post</Button>
                    </div>
                </div>
                <div className="h-full border-2 border-black w-full mt-[20px] rounded-[10px] p-[20px] flex flex-col gap-5">
                    <div className='rounded-[50%] flex gap-3'>
                        <img src={boy} alt="" className=' rounded-full object-cover h-[56px] w-[56px]' />
                        <div className='w-[200px] '>
                            <b>Alex Rivera</b><br />
                            <p>@arivera • 2h ago</p>
                        </div>
                    </div>
                    <div>
                        <p>Just finished building the new layout for ConnectHub. The teal and purple gradient looks amazing in the dark theme as well! What do you guys think? 🚀</p>
                    </div>
                    <div className='flex justify-center items-center w-full h-[300px]'>
                        <img src={boy} alt="boy" className='w-[400px] h-[400px]   rounded-[10px]' />
                    </div>
                    <hr />
                    <div className='flex justify-between items-center p-[10px] '>
                        <div className='flex gap-5'>
                            <MessageCircle className='cursor-pointer' />
                            <Heart className='cursor-pointer' color='red' fill='red' />
                            <Share2 className='cursor-pointer' />
                        </div>
                    </div>

                </div>
                <div className="h-full border-2 border-black w-full mt-[20px] rounded-[10px] p-[20px] flex flex-col gap-5">
                    <div className='rounded-[50%] flex gap-3'>
                        <img src={boy} alt="" className=' rounded-full  h-[56px] w-[56px]' />
                        <div className='w-[200px] '>
                            <b>Alex Rivera</b><br />
                            <p>@arivera • 2h ago</p>
                        </div>
                    </div>
                    <div>
                        <p>Just finished building the new layout for ConnectHub. The teal and purple gradient looks amazing in the dark theme as well! What do you guys think? 🚀</p>
                    </div>
                    <div className='flex justify-center items-center w-full'>

                    </div>
                    <hr />
                    <div className='flex justify-between items-center p-[10px] '>
                        <div className='flex gap-5'>
                            <MessageCircle className='cursor-pointer' />
                            <Heart className='cursor-pointer' color='red' fill='red' />
                            <Share2 className='cursor-pointer' />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default DashBoard;