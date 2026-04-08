import React, { useState } from 'react'
import { Button, Avatar, IconButton } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { API_URL } from '../config/config';
import { useNavigate } from 'react-router-dom';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

import { useSelector } from 'react-redux';

const CreatePost = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [imageFile, setImageFile] = useState(null)
    const user = useSelector((state) => state.user.user) || {};

    const validationSchema = Yup.object({
        caption: Yup.string().required('Caption is required')
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (values) => {
        try {
            const formData = new FormData();
            formData.append('caption', values.caption);
            formData.append('authorName', `${user.firstName || 'User'} ${user.lastName || ''}`);
            formData.append('authorId', user.email || "user123");

            if (imageFile) {
                formData.append('image', imageFile);
            }

            const response = await axios.post(`${API_URL}/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201 || response.status === 200) {
                alert("Post shared successfully!");
                navigate('/dashboard');
            }
        } catch (error) {
            console.error("Error creating post:", error);
            alert("Failed to share post. Please try again.");
        }
    };

    return (
        <div className='w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
            <Header />
            <div className='flex mt-[20px]'>
                <aside className='w-[20%]'>
                    <SideBar />
                </aside>

                <main className='flex-1 p-2 mt-[100px]'>
                    <div className='max-w-4xl mx-auto bg-gray-200 rounded-3xl overflow-hidden border border-gray-800 flex flex-col md:flex-row shadow-2xl'>
                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-[400px] md:h-auto flex items-center justify-center bg-gray-900 border-r border-gray-800 relative">
                            {imagePreview ? (
                                <div className="relative w-full h-full">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                                    <IconButton
                                        onClick={() => setImagePreview(null)}
                                        className="absolute top-4 right-4 bg-gray-200  hover:bg-black/70"
                                        sx={{ position: 'absolute', top: 16, right: 16, color: 'white', backgroundColor: 'rgba(0,0,0,0.5)' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center gap-4">
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="icon-button-file"
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    <label htmlFor="icon-button-file">
                                        <IconButton color="primary" aria-label="upload picture" component="span" sx={{ fontSize: 60, color: '#8798EE' }}>
                                            <PhotoCamera sx={{ fontSize: 60 }} />
                                        </IconButton>
                                    </label>
                                    <p className="text-gray-400">Click to upload image</p>
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-6 lg:p-10">
                            <Formik
                                initialValues={{ caption: '' }}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, isValid }) => (
                                    <Form className="h-full flex flex-col">
                                        <div className="flex justify-between items-center mb-10">
                                            <h1 className="text-2xl font-bold text-[#8798EE]">New Post</h1>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                disabled={isSubmitting || !isValid || !imagePreview}
                                                sx={{
                                                    backgroundColor: '#8798EE',
                                                    borderRadius: '20px',
                                                    padding: '8px 24px',
                                                    '&:hover': { backgroundColor: '#7687d6' }
                                                }}
                                            >
                                                Share
                                            </Button>
                                        </div>

                                        <div className="flex-1 flex flex-col gap-6">
                                            <div className="flex items-center gap-4">
                                                <Avatar
                                                    src={user.avatar}
                                                    sx={{ width: 48, height: 48, backgroundColor: '#8798EE' }}
                                                >
                                                    {!user.avatar && (user.firstName ? user.firstName.charAt(0) : 'U')}
                                                </Avatar>
                                                <div>
                                                    <h2 className="text-md font-semibold text-black">{user.firstName || 'User'} {user.lastName || ''}</h2>
                                                    <h3 className="text-xs text-gray-700">@{user.firstName ? user.firstName.toLowerCase() : 'user'}</h3>
                                                </div>
                                            </div>

                                            <Field
                                                as="textarea"
                                                name="caption"
                                                placeholder="Write your caption here..."
                                                className="w-full h-[200px] bg-transparent border-none text-lg focus:ring-0 resize-none placeholder-gray-500 text-black p-[10px]"
                                            />
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CreatePost;