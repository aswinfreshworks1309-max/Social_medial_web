import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'
import { Formik, ErrorMessage, Field, Form } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { API_URL } from '../config/config'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../utils/toast'




import { useDispatch } from 'react-redux'
import { setUser } from '../redux/userSlice'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const schemaValidation = yup.object({
    email:yup.string().email("invalid Email").required("Email is required"),
    password:yup.string().required("Password is required")
  })

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/login`, values);
      if (response.status === 200 && response.data.user) {
        dispatch(setUser(response.data.user));
        showToast.success("Login successful!");
        navigate('/dashboard');
      } else {
        showToast.error(response.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      showToast.error(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };
  return (
    <>
      <section className='flex justify-center items-center h-screen bg-theme-bg'>
      <header className=' w-full h-[80px]  border-b border-theme-border absolute top-0 left-0 flex justify-start items-center'>
        <h1 className='text-3xl font-bold text-theme-accent ml-[4%]'>ConnectHub</h1>
      </header><br />

      <main className='h-[600px] w-[400px] border border-theme-border rounded-[30px] flex justify-center items-center flex-col gap-4 bg-theme-input backdrop-blur-md'>
        <div className='flex flex-col justify-center items-center gap-4'>
          <h1 className='text-2xl font-bold text-center text-theme-accent'>ConnectHub</h1>
          <div className='flex flex-col justify-center items-center gap-2'>
            <h1 className='text-3xl font-bold text-center text-theme-text'>Welcome Back</h1>
            <p className='text-center text-theme-text-secondary'>Connect with your world in a click</p>
          </div>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={schemaValidation}
          onSubmit={handleLogin}
        >
          
        <Form className='flex flex-col gap-4 justify-center items-center'>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Email Address" className='text-theme-text-secondary'>Email Address</label>
    <Field type="email" id="Email Address" placeholder='Enter your Email' name = "email" className='h-[40px] w-[300px] border border-theme-border text-theme-text bg-transparent p-[10px] rounded-[7px] focus:border-2 focus:border-theme-accent focus:outline-none placeholder:text-theme-text-muted ' />
          <ErrorMessage name='email' component='div' className='text-red-500 text-sm w-full text-center'/>
            </div>
          <div className='flex flex-col gap-2'>
            <label htmlFor="Password" className='text-theme-text-secondary'>Password</label>
            <Field type="password" id="Password" name= 'password' placeholder='Enter your Password' className='h-[40px] w-[300px] border border-theme-border text-theme-text bg-transparent p-[10px] rounded-[7px] focus:border-2 focus:border-theme-accent focus:outline-none placeholder:text-theme-text-muted' />
              <ErrorMessage name='password' component='div' className='text-red-500 text-sm w-full text-center' />
            </div>
          <div className='flex justify-start w-[300px] gap-2'>
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me" className='text-theme-text-secondary'>Keep me logged in</label>
          </div>
          <LoginButton text='Login' type='submit'/>

          <p className='text-theme-text-secondary'>Don't have an account ? <Link to="/" className=' text-theme-accent hover:underline'>Register</Link></p>
        </Form>
      </Formik>
      </main>
    </section>
      <div className='h-[30%] w-[20%]   rounded-[30px] absolute top-[35%] left-[15%] transform translate-x-[-50%] translate-y-[-50%]  bg-theme-accent/20 blur-[100px] '> 

      </div>
    </>

  )
}

export default Login;
