import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'


const Login = () => {
  return (
    <div className='flex justify-center items-center h-screen bg-[linear-gradient(122.01deg,_#00C2B070_0%,_#FFFFFFFF_50%,_#212B3B1A_100%)]'>

      <div className='h-[600px] w-[400px] border-[1px] border-black rounded-[30px] flex justify-center items-center flex-col gap-4'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-2xl font-bold text-center text-[#00C2B0]'>ConnectHub</h1>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-3xl font-bold text-center'>Welcome Back</h1>
            <p className='text-center'>Connect with your world in a click</p>
          </div>
        </div>

        <form typeof='submit' className='flex flex-col gap-4 justify-center items-center'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Email Address">Email Address</label>


            <input type="email" id="Email Address" placeholder='Enter your Email' className='h-[40px] w-[300px] border-[1px] border-gray-500 p-[10px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
          </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Password">Password</label>
            <input type="password" id="Password" placeholder='Enter your Password' className='h-[40px] w-[300px] border-[1px] border-gray-500 p-[10px] rounded-[7px] focus:border-[2px] focus:border-[#00C2B0] focus:outline-none' />
          </div>
          <div className='flex justify-start w-[300px] gap-2'>
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Keep me logged in</label>
          </div>
          <Link to="/register">  <LoginButton /></Link>

          <p>Don't have an account ? <a href="/register" className=' text-[#00C2B0]'>Register</a></p>
        </form>
      </div>

    </div>
  )
}

export default Login;
