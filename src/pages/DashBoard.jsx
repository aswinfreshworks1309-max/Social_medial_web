import React, { useState,useEffect } from "react";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import PostCard from "./Post";
import axios from "axios";
import { API_URL } from "../config/config";

const DashBoard = () => {
    const [value, setValue] = useState('')
    const [posts, setPosts] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const user = JSON.parse(localStorage.getItem('user')) || {};



    const handleChange = (e) => {
        setValue(e.target.value)
    }

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
    }

    // post
    const handlePost = async () => {
        if (!value.trim() && !imagePreview) {
            alert("Please enter some text or select an image");
            return;
        }

        try {
            const formData = new FormData();
            formData.append('caption', value);
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
                setValue('')
                setImagePreview(null)
                setImageFile(null)
                getPost() // Refresh feed
                alert("Post created successfully!");
            }
        } catch (error) {
            console.error("Error creating dashboard post:", error);
            alert("Failed to create post. Please try again.");
        }
    }

    // get request
    const getPost = async () => {
        try {
            const response = await axios.get(`${API_URL}/posts`)
            setPosts(response.data.posts)
        } catch (error) {
            console.error("Error fetching posts:", error)
        }
    }

    // Fetch posts 
    useEffect(() => {
        getPost()
    }, [])

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header />
            <div className="flex mt-[20px]">
                <aside className="w-[20%]">
                    <SideBar />
                </aside>

                <main className="flex-1 ">
                    <div className="max-w-3xl mx-auto">
                        {/* Create Post Section */}
                        <div className="flex flex-col gap-5 w-full border  border-gray-700 p-6 rounded-2xl bg-[#5e606721] shadow-sm mb-8">
                            <div className="flex gap-5 items-start">
                                <div className="h-[50px] w-[50px] rounded-full border-2 border-gray-600 relative overflow-hidden flex items-center justify-center bg-[#8798EE] text-white font-bold shrink-0 mt-1">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt="Profile"
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span>{user.firstName ? user.firstName.charAt(0) : 'U'}</span>
                                    )}
                                    <div className="bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 border-2 border-gray-900"></div>
                                </div>

                                <div className="flex-1 flex flex-col gap-4">
                                    <textarea
                                        onChange={handleChange}
                                        value={value}
                                        placeholder="What's on your mind?"
                                        className="h-[60px] w-full border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-[#8798EEFF] focus:outline-none bg-transparent text-white resize-none"
                                    />

                                    {imagePreview && (
                                        <div className="relative w-full max-h-[300px] overflow-hidden rounded-xl border border-gray-700">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg-black/20" />
                                            <button
                                                onClick={() => setImagePreview(null)}
                                                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full hover:bg-black/70 transition"
                                            >
                                                <svg xmlns="http://www.w3.org/2001/XMLSchema-instance" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2 border-t border-gray-700/50">
                                <div className="flex gap-4">
                                    <input
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        id="dashboard-post-image"
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    <label
                                        htmlFor="dashboard-post-image"
                                        className="text-gray-400 hover:text-[#8798EE] transition p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg-gray-800"
                                    >
                                        <svg xmlns="http://www.w3.org/2001/XMLSchema" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
                                    </label>
                                </div>

                                <Button
                                    onClick={handlePost}
                                    variant="contained"
                                    disabled={!value.trim() && !imagePreview}
                                    sx={{
                                        backgroundColor: '#8798EE',
                                        borderRadius: '20px',
                                        '&:hover': { backgroundColor: '#7687d6' },
                                        '&:disabled': { backgroundColor: '#5e6067' }
                                    }}
                                >
                                    Post
                                </Button>
                            </div>
                        </div>

                        {/* Feed Section */}
                        <div className="flex flex-col gap-6 ">
                            {posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <PostCard key={post._id || index} post={post} />
                                ))
                            ) : (
                                <div className="mt-10 text-center text-gray-500">
                                    <p>No posts yet. Be the first to share something!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashBoard;


