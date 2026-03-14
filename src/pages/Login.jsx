import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'
import { Formik, ErrorMessage, Field, Form } from 'formik'
import * as yup from 'yup'
import { Password } from '@mui/icons-material'




const Login = () => {

  const schemaValidation = yup.object({
    email:yup.string().required("Email is required"),
    password:yup.string().required("Password is required")
  })
  return (
    <>    <section className='flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <header className=' w-full h-[80px]  border-[1px] border-gray-400 absolute top-0 left-0 flex justify-start items-center'>
        <h1 className='text-3xl font-bold text-[#8798EEFF] ml-[4%]'>ConnectHub</h1>
      </header><br />

      <main className='h-[600px] w-[400px] border-[1px] border-black rounded-[30px] flex justify-center items-center flex-col gap-4 bg-[#5e606721]'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-2xl font-bold text-center text-[#8798EEFF]'>ConnectHub</h1>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-3xl font-bold text-center text-white'>Welcome Back</h1>
            <p className='text-center text-white'>Connect with your world in a click</p>
          </div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schemaValidation}
        >
          
        <Form typeof='submit' className='flex flex-col gap-4 justify-center items-center'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Email Address" className='text-white'>Email Address</label>
    <Field type="email" id="Email Address" placeholder='Enter your Email' name = "email" className='h-[40px] w-[300px] border-[1px] text-white border-gray-500 p-[10px] rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400 ' />
         <ErrorMessage name='email' component='div' className='text-red-500'/>
            </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Password" className='text-white'>Password</label>
            <Field type="password" id="Password" name= 'password' placeholder='Enter your Password' className='h-[40px] w-[300px] border-[1px] text-white border-gray-500 p-[10px] rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400' />
              <ErrorMessage name='password' component='div' className='text-red-500' />
            </div>
          <div className='flex justify-start w-[300px] gap-2'>
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me" className='text-gray-300'>Keep me logged in</label>
          </div>
          <Link to="/register">  <LoginButton text='Login'/></Link>

          <p className='text-white'>Don't have an account ? <a href="/register" className=' text-[#8798EEFF]'>Register</a></p>
        </Form>
      </Formik>
      </main>
    </section>
      <div className='h-[30%] w-[20%]   rounded-[30px] absolute top-[35%] left-[15%] transform translate-x-[-50%] translate-y-[-50%]  bg-[#9fadf45f] opacity-0.3 blur-[100px] '> 

      </div>
    </>

  )
}

export default Login;
