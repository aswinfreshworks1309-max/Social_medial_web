import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import LoginButton from '../components/LoginButton'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from 'yup'
import { Camera } from 'lucide-react'





const Register = () => {

    const validationSchema = yup.object({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().email("Invalid email format").required("Email is required"),
        password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
    });

    const [image, setImage] = useState(null)
    
    
    const handleImage = (e) => {
        const file = e.target.files[0]
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
           
        }
         
    }
    return (
        <>
           

      
        
            <section className='flex justify-center items-center flex-col  bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            <header className=' w-full h-[80px]  border-[1px] border-gray-400 absolute top-0 left-0 flex justify-start items-center'>
                <h1 className='text-3xl font-bold text-[#8798EEFF] ml-[4%]'>ConnectHub</h1>
            </header><br />
            <main className='flex justify-center items-center flex-col gap-[10px] w-[400px] flex flex-col p-4 mt-25 border-[1px] mb-10 border-black rounded-[30px] bg-[#5e606721]'>
                <div className='flex flex-col justify-center items-center gap-2'>
                    <h1 className='text-3xl font-bold text-white'>Create Account</h1>
                    <h4 className='w-[300px] text-center text-white '>Upload an avatar and fill in your details to get started.</h4>
                    </div>
                    <Formik
                        initialValues={{ firstName: "", lastName : "",email: "", password: "",confirmPassword:"" }}
                        validationSchema={validationSchema}
                       >
                <Form action="" className='flex flex-col justify-center items-center gap-3'>
                            <label className='h-[100px] w-[100px] rounded-full cursor-pointer border-[3px] border-white border-dotted flex justify-center items-center overflow-hidden'>

                                {image ? (
                                    <img
                                        src={image}
                                        alt="profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                ) : (
                                    <Camera className="text-white" size={30} />
                                )}

                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />

                            </label>
                    <div className='flex gap-3 ml-[10%]'>

                        <div className='flex flex-col gap-2'>
                            <label htmlFor="First Name" className='text-white'>First Name</label>
                            <Field type="text" placeholder='First Name' name='firstName' className='w-[80%] border-[1px] border-black h-[40px] p-[20px] text-white border-gray-500 rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400' />
                                    <ErrorMessage name='firstName' component="div" className='text-red-500' />
                            </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Last Name" className='text-white'>Last Name</label>
                            <Field type="text" placeholder='Last Name' name = "lastName" className='w-[80%] border-[1px] border-black h-[40px] p-[20px] text-white border-gray-500 rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400' />
                        <ErrorMessage name='lastName' component= "div" className='text-red-500' />
                                </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="Email" className='text-white'>Email</label>
                        <Field type="text" placeholder='Email' name ="email"  className='w-[300px] border-[1px] border-black h-[40px] p-[20px] text-white border-gray-500 rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400' />
                                <ErrorMessage name='email' component="div" className='text-red-500' />

                            </div>

                    <div className='flex gap-4 flex-col md-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Password" className='text-white'>Password</label>
                            <Field type="text" placeholder='Password' name="password" className='w-[300px] border-[1px] border-black h-[40px] p-[20px] text-white border-gray-500 rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400' />
                                    <ErrorMessage name='password' component="div" className='text-red-500' />

                                </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="Confirm Password" className='text-white'>Confirm Password</label>
                            <Field type="text" placeholder='Confirm Password' name = "confirmPassword" className='w-[300px] border-[1px] border-black h-[40px] p-[20px] text-white border-gray-500 rounded-[7px] focus:border-[2px] focus:border-[#8798EEFF] focus:outline-none placeholder:text-gray-400' />
                                    <ErrorMessage name='confirmPassword' component="div" className='text-red-500' />

                                </div>
                    </div >
                    <div className='mt-[10px] flex flex-col gap-2 justify-center items-center'>

                        <Link to="/login"><LoginButton text='Register' type='submit'/></Link>
                        <p className='text-white'>Already have an account ? <a href="/login" className='text-[#8798EEFF]'>Login</a></p>
                    </div>
                        </Form>
                    </Formik>
            </main>
        </section>
            <div className='h-[30%] w-[20%]   rounded-[30px] absolute top-[35%] left-[15%] transform translate-x-[-50%] translate-y-[-50%]  bg-[#9fadf45f] opacity-0.3 blur-[100px] '>

            </div>

        </>

    )
}

export default Register