import React from 'react'
import { Search, Bell } from 'lucide-react'
import profile from '../assets/profile.png'



const Header = () => {
    return (
        <div className='flex justify-between border-[1px] border-white h-[80px] items-center bg-transparent '>
            <div className='flex gap-[90px] ml-5 justify-center items-center '>
                <h1 className='text-2xl font-bold text-[#8798EEFF] cursor-pointer '>ConnectHub</h1> 
                <div className='relative'>
                    <input type="text" placeholder='Search people...' className='border-[1px] border-gray-50 p-2 rounded-xl pl-10 placeholder:text-gray-400 w-[130%] text-white' />
                    <Search className='absolute top-2 left-2 text-gray-400 text-[10px]'/>

                </div>
           

            </div>
            <div className='flex gap-4 justify-center items-center mr-[30px] '>
                <div className='flex relative cursor-pointer'><Bell style={{color:"white"}} /><div className='h-[10px] w-[10px] bg-red-600 rounded-[50%] absolute top-[2px] right-[1px]'></div></div>
                <div className='w-[56px] h-[56px] flex justify-center items-center overflow-hidden relative cursor-pointer'>
                    <img src={ profile} alt=""  className='h-[50px] w-[50px] rounded-[50%] '/>
                    <div className='bg-green-500 h-[15px] w-[15px] rounded-[50%] absolute bottom-[2px] right-[2px]'></div>
                </div>

            </div>
        </div>
    )
}

export default Header
