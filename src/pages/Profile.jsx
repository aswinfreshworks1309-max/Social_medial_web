import React from 'react'
import { location, post } from '../data/profile'
import profile from "../assets/profile.png";
import { Button } from '@mui/material';
import { User } from 'lucide-react'
import { image } from '../data/profile'
import Header from '../components/Header';



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

        
                <div className='flex gap-5 justify-center items-center mr-4'>
                    <Button variant="outlined">Edit Profile</Button>
                    <Button variant="contained"><User />Follow</Button>
                </div>

                </div>
            </div>


            <div className='flex gap-5 '>

                {post.map((x, i) => (
                    <div key={i} className='h-[80px] w-[100px]  flex flex-col justify-center items-center'><h1>{x.post}</h1><h3>{x.no}</h3>
</div>))}
            </div>
            <div className='ml-8 w-[500px]'>
                <h1>About Me</h1>
                <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit minima incidunt itaque sint optio dolorem ipsum nemo aliquam inventore excepturi!</p>
            </div>

            <div className='flex flex-col gap-10 flex-wrap mt-[50px] ml-7'>

                <h3 className='text-3xl'>
                    Posts
                </h3>

                <hr />
                <div className='flex gap-5'>
                    {image.map((x, i) => <img key={i} src={x} alt="image" />)}
                </div>
            </div>
        </div>
    )
}

export default Profile
