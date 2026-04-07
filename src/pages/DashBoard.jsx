import React, { useState, useEffect } from "react";
import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
    Card,
    CardContent,
    Divider,
    CircularProgress
} from "@mui/material";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import PostCard from "./Post";
import axios from "axios";
import { API_URL } from "../config/config";
import { UserPlus } from "lucide-react";

const DashBoard = () => {
    const [value, setValue] = useState('')
    const [posts, setPosts] = useState([])
    const [imagePreview, setImagePreview] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const [connections, setConnections] = useState([])
    const [isLoadingConnections, setIsLoadingConnections] = useState(false)
    const [isExpanded, setIsExpanded] = useState(false)
    const [followingList, setFollowingList] = useState([])
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
        if (!value && !imagePreview) {
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

    // Fetch initial data
    useEffect(() => {
        getPost()
        getConnections()
    }, [])

    const getConnections = async () => {
        setIsLoadingConnections(true)
        try {
            const response = await axios.get(`${API_URL}/register?exclude=${user.email}`)
            setConnections(response.data.users || [])
            setFollowingList(response.data.following || [])
        } catch (error) {
            console.error("Error fetching connections:", error)
        } finally {
            setIsLoadingConnections(false)
        }
    }

    const handleFollow = async (targetEmail) => {
        try {
            const response = await axios.post(`${API_URL}/register/follow`, {
                followerEmail: user.email,
                followingEmail: targetEmail
            })
            
            if (response.data.following) {
                setFollowingList([...followingList, targetEmail])
            } else {
                setFollowingList(followingList.filter(email => email !== targetEmail))
            }
        } catch (error) {
            console.error("Error toggling follow:", error)
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-500 text-[#0a8fd2]">
            <Header />
            <div className="flex mt-[20px]">
                <aside className="w-[20%]">
                    <SideBar />
                </aside>

                <main className="flex-1 ">
                    <div className="max-w-3xl  ml-[10%]">
                        {/* Create Post Section */}
                        <div className="flex flex-col gap-5 w-[550px] border  border-gray-700 p-6 rounded-2xl bg-white shadow-sm mb-8">
                            <div className="flex gap-5 items-start">
                                <div className="h-[50px] w-[50px] rounded-full border-2 border-gray-600 relative overflow-hidden flex items-center justify-center bg -[#8798EE] text-white font-bold shrink-0 mt-1">
                                    {user.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt="Profile"
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <span>{user.firstName ? user.firstName.charAt(0) : 'U'}</span>
                                    )}
                                    <div className="bg -green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 border-2 border-gray-900"></div>
                                </div>

                                <div className="flex-1 flex flex-col gap-4">
                                    <textarea
                                        onChange={handleChange}
                                        value={value}
                                        placeholder="What's on your mind?"
                                        className="h-[60px] w-full border border-gray-700 p-3 rounded-xl focus:ring-2 focus:ring-[#0a8fd2] focus:outline-none bg -transparent text-[#0a8fd2] resize-none"
                                    />

                                    {imagePreview && (
                                        <div className="relative w-full max-h-[300px] overflow-hidden rounded-xl border border-gray-700">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-contain bg -white " />
                                            <button
                                                onClick={() => setImagePreview(null)}
                                                className="absolute top-2 right-2 bg -black/50 text-[#5DD3B6] p-1 rounded-full hover:bg -black/70 transition"
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
                                        className="text-[#5DD3B6] hover:text-[#5DD3B6] transition p-2 cursor-pointer flex items-center justify-center rounded-full hover:bg -gray-700/10"
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
                <div className={`w-[28%] hidden lg:block fixed right-4 top-[100px] transition-all duration-500 ease-in-out ${isExpanded ? 'z-50' : ''}`}>
                    <Card sx={{
                        borderRadius: '20px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        border: '1px solid rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        height: isExpanded ? 'calc(100vh - 120px)' : 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.5s ease-in-out'
                    }}>
                        <CardContent sx={{ 
                            p: 3, 
                            flex: 1, 
                            display: 'flex', 
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}>
                            <div className="flex justify-between items-center mb-2">
                                <Typography variant="h6" sx={{
                                    fontWeight: 'bold',
                                    color: '#1a1a1a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1
                                }}>
                                    Suggested for you
                                </Typography>
                                {isExpanded && (
                                    <Button 
                                        onClick={() => setIsExpanded(false)}
                                        size="small"
                                        sx={{ color: 'gray', textTransform: 'none' }}
                                    >
                                        Close
                                    </Button>
                                )}
                            </div>

                            <div className={`flex-1 overflow-y-auto pr-2 custom-scrollbar ${isExpanded ? 'max-h-full' : 'max-h-[400px]'}`}>
                                {isLoadingConnections ? (
                                    <div className="flex justify-center p-8">
                                        <CircularProgress size={30} sx={{ color: '#8798EE' }} />
                                    </div>
                                ) : (
                                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                                        {connections.length > 0 ? (
                                            connections.map((conn, index) => {
                                                const isFollowing = followingList.includes(conn.email);
                                                return (
                                                    <React.Fragment key={conn._id || index}>
                                                        <ListItem
                                                            alignItems="flex-start"
                                                            sx={{
                                                                px: 0,
                                                                py: 1.5,
                                                                '&:hover': { bgcolor: 'rgba(135, 152, 238, 0.05)' }
                                                            }}
                                                            secondaryAction={
                                                                <Button
                                                                    onClick={() => handleFollow(conn.email)}
                                                                    variant={isFollowing ? "outlined" : "text"}
                                                                    size="small"
                                                                    sx={{
                                                                        color: '#8798EE',
                                                                        borderColor: '#8798EE',
                                                                        borderRadius: '15px',
                                                                        fontWeight: 'bold',
                                                                        textTransform: 'none',
                                                                        minWidth: '80px',
                                                                        '&:hover': { bgcolor: 'transparent', color: '#7687d6', borderColor: '#7687d6' }
                                                                    }}
                                                                >
                                                                    {isFollowing ? 'Following' : 'Follow'}
                                                                </Button>
                                                            }
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar
                                                                    alt={`${conn.firstName} ${conn.lastName}`}
                                                                    src={conn.avatar}
                                                                    sx={{
                                                                        bgcolor: '#8798EE',
                                                                        width: 45,
                                                                        height: 45,
                                                                        fontSize: '1rem',
                                                                        fontWeight: 'bold'
                                                                    }}
                                                                >
                                                                    {conn.firstName ? conn.firstName.charAt(0) : 'U'}
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={
                                                                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
                                                                        {conn.firstName} {conn.lastName}
                                                                    </Typography>
                                                                }
                                                                secondary={
                                                                    <Typography variant="caption" sx={{ color: 'gray' }}>
                                                                        {conn.email?.split('@')[0]}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </ListItem>
                                                        {index < connections.length - 1 && <Divider variant="inset" component="li" sx={{ ml: '72px', opacity: 0.5 }} />}
                                                    </React.Fragment>
                                                );
                                            })
                                        ) : (
                                            <Typography variant="body2" sx={{ textAlign: 'center', py: 4, color: 'gray', fontStyle: 'italic' }}>
                                                No suggestions found
                                            </Typography>
                                        )}
                                    </List>
                                )}
                            </div>

                            <Divider sx={{ mt: 1, mb: 2 }} />

                            <Button
                                onClick={() => setIsExpanded(!isExpanded)}
                                fullWidth
                                sx={{
                                    color: 'gray',
                                    textTransform: 'none',
                                    fontSize: '0.8rem',
                                    '&:hover': { bgcolor: 'transparent', color: '#1a1a1a' }
                                }}
                            >
                                {isExpanded ? 'Show less' : 'View all suggestions'}
                            </Button>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;


