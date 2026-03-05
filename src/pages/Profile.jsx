import React from 'react'
import { location, post } from '../data/profile'
import profile from "../assets/profile.png";
import { Button } from '@mui/material';
import { User } from 'lucide-react'
import { image } from '../data/profile'
import Header from '../components/Header';
import SideBar from '../components/SideBar';



const Profile = () => {
    return (
        <div >
            <Header />

            <div >


                <div className='h-[300px] w-[100%]'>
                    <img src={profile} alt="" className='h-[300px] w-[100%] object-cover' />

                </div>
                <div className='flex justify-between items-center mt-10 '>


                    <div className=' flex gap-8   justify-center items-center ml-5  '>
                        <img src={profile} alt="Profile image" className='h-[150px] w-[150px] rounded-[50%]' />
                        <div >
                            <h1 className='text-2xl'> <b>Felix Wanderer</b></h1>
                            <h2>Creative Director & Digital Artist</h2>
                            <div className='flex gap-4 '>
                                {location.map((x, i) => <p key={i} >{x}</p>)}
                            </div>
                        </div>
                    </div>


                    <div className='flex gap-5 justify-center items-center mr-15'>
                        <Button variant="outlined" >Edit Profile</Button>
                        <Button variant="contained" sx={{ background: "#00C2B0FF" }}><User />Follow</Button>
                    </div>

                </div>
            </div>


            <div className='flex gap-5 '>

                {post.map((x, i) => (
                    <div key={i} className='h-[80px] w-[100px]  flex flex-col justify-center items-center'><b className='text-[18px] text-shadow-[#00C2B0FF] shadow-lg'>{x.post}</b><h3>{x.no}</h3>
                    </div>))}
            </div>
            <div className='ml-8 w-[500px] border p-3 rounded-2xl shadow-lg shadow-[#00C2B0FF] mt-5'>
                <b className='text-2xl'>About Me</b>
                <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minima incidunt itaque sint optio dolorem ipsum nemo aliquam inventore excepturi!</p>
            </div>

            <div className='flex flex-col gap-10 flex-wrap mt-[50px] ml-7'>

                <h3 className='text-3xl'>
                    Posts
                </h3>

                <hr />
                <div className='flex gap-5 mb-[50px]'>

                    {image.map((x, i) => (
                        <div key={i} className='h-auto flex flex-col w-[300px] border p-4 rounded-2xl shadow-lg shadow-[#00C2B0FF] hover:-translate-y-2 transition-transform duration-300' >
                            <img key={i} src={x} alt="image" className='h-[350px] w-full object-cover' />
                            <h1 className='text-center mt-2 font-bold'>Post {i + 1}</h1>
                            <b>Description</b>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis, reprehenderit!</p>

                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Profile
