import React from 'react'
import { Search, Bell } from 'lucide-react'
import profile from '../assets/profile.png'



const Header = () => {
    return (
        <div className='flex justify-between border-[1px] border-black h-[70px] items-center'>
            <div className='flex gap-4 ml-5 justify-center items-center '>
                <h1 className='text-2xl font-bold text-[#00C2B0FF]'>ConnectHub</h1>
                <div className='flex relative ml-[30px]'> <input type="text" placeholder='Search' className='pl-[40px] h-[40px] w-[300px] border-2 border-gray-500 rounded-2xl p-[10px]  ' />
                    <Search className='absolute top-[10px] left-[8px] text-gray-500' />
                </div>

            </div>
            <div className='flex gap-4 justify-center items-center mr-[30px] '>
                <div className='flex relative'><Bell /><div className='h-[10px] w-[10px] bg-red-600 rounded-[50%] absolute top-[2px] right-[1px]'></div></div>
                <div className='w-[56px] h-[56px] flex justify-center items-center overflow-hidden relative'>
                    <img src={ profile} alt=""  className='h-[50px] w-[50px] rounded-[50%] '/>
                    <div className='bg-green-500 h-[15px] w-[15px] rounded-[50%] absolute bottom-[2px] right-[2px]'></div>
                </div>

            </div>
        </div>
    )
}

export default Header
