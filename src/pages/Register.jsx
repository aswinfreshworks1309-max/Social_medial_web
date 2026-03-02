import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'

const Register = () => {
    return (
        <div className='flex justify-center items-center h-[100vh] flex-col bg-[linear-gradient(122.01deg,_#00C2B070_0%,_#FFFFFFFF_50%,_#212B3B1A_100%)] '>
            <div className='flex justify-center items-center flex-col gap-[10px] w-[400px] h-[700px] border-[1px] border-black rounded-[30px]'>
                <div>
                    <h1 className='text-3xl font-bold text-[#00C2B0]'>ConnectHub</h1>
                </div>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-4xl font-bold '>Create Account</h1>
                    <h4 className='w-[300px] text-center'>Join thousands of users connecting every day across the globe.</h4>
                </div>
                <form action="" className='flex flex-col justify-center items-center gap-3'>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="First Name">First Name</label>
                        <input type="text" placeholder='First Name' className='w-[300px] border-[1px] border-black h-[40px] p-[20px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="Last Name">Last Name</label>
                        <input type="text" placeholder='Last Name' className='w-[300px] border-[1px] border-black h-[40px] p-[20px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="Email">Email</label>
                        <input type="text" placeholder='Email' className='w-[300px] border-[1px] border-black h-[40px] p-[20px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
                    </div>

                    <div className='flex gap-4 flex-col md-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Password">Password</label>
                            <input type="text" placeholder='Password' className='w-[300px] border-[1px] border-black h-[40px] p-[20px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Confirm Password">Confirm Password</label>
                            <input type="text" placeholder='Confirm Password' className='w-[300px] border-[1px] border-black h-[40px] p-[20px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
                        </div>
                    </div >
                    <div className='mt-[10px] flex flex-col gap-2 justify-center items-center'>

                        <Link to="/login"><LoginButton /></Link>
                        <p>Already have an account ? <a href="/login" className=' text-[#00C2B0]'>Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register