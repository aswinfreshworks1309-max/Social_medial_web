import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Tabs, Tab, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { User, MessageCircle, Mail, Camera, Heart, Users, UserPlus, UserMinus } from 'lucide-react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { API_URL } from '../config/config';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const loggedInUser = JSON.parse(localStorage.getItem('user')) || {};
    
    const [profileUser, setProfileUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(!id || id === loggedInUser._id);
    const [isFollowing, setIsFollowing] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [friendsOpen, setFriendsOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [avatarFile, setAvatarFile] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const [stats, setStats] = useState({
        postCount: 0,
        followers: 0,
        following: 0,
        posts: []
    });
    
    const [friendsData, setFriendsData] = useState({
        followers: [],
        following: []
    });
    
    const [editData, setEditData] = useState({
        firstName: '',
        lastName: '',
        bio: '',
    });

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            if (isOwnProfile) {
                // Fetch own profile stats using email (current pattern)
                const response = await axios.get(`${API_URL}/profile/stats?email=${loggedInUser.email}`);
                setStats(response.data);
                setProfileUser(loggedInUser);
                setEditData({
                    firstName: loggedInUser.firstName || '',
                    lastName: loggedInUser.lastName || '',
                    bio: loggedInUser.bio || '',
                });
            } else {
                // Fetch other user profile by ID
                const response = await axios.get(`${API_URL}/profile/${id}`);
                const data = response.data;
                setProfileUser(data.user);
                setStats({
                    postCount: data.postCount,
                    followers: data.followers,
                    following: data.following,
                    posts: data.posts
                });
                
                // Check if following
                const followRes = await axios.get(`${API_URL}/register?exclude=`); // We need a way to check following status
                // Optimized way: get local user's following list
                const myStats = await axios.get(`${API_URL}/register?exclude=null&search=${loggedInUser.email}`);
                const followingList = myStats.data.following || [];
                setIsFollowing(followingList.includes(data.user.email));
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setIsOwnProfile(!id || id === loggedInUser._id);
    }, [id, loggedInUser._id]);

    useEffect(() => {
        fetchProfileData();
    }, [id, isOwnProfile]);

    const handleFollow = async () => {
        try {
            const response = await axios.post(`${API_URL}/register/follow`, {
                followerEmail: loggedInUser.email,
                followingEmail: profileUser.email
            });
            setIsFollowing(response.data.following);
            setStats(prev => ({
                ...prev,
                followers: response.data.following ? prev.followers + 1 : prev.followers - 1
            }));
        } catch (err) {
            console.error("Follow error:", err);
        }
    };

    const handleMessage = () => {
        navigate('/chat', { state: { selectedUser: profileUser } });
    };

    const fetchFriends = async () => {
        try {
            const response = await axios.get(`${API_URL}/profile/friends?email=${profileUser.email}`);
            setFriendsData(response.data);
        } catch (err) {
            console.error("Error fetching friends:", err);
        }
    };

    const handleOpen = () => setOpen(true);
    const handleFriendsOpen = () => {
        fetchFriends();
        setFriendsOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setAvatarFile(null);
    };

    const handleChange = (e) => setEditData({ ...editData, [e.target.name]: e.target.value });
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatarFile(e.target.files[0]);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('firstName', editData.firstName);
            formData.append('lastName', editData.lastName);
            formData.append('bio', editData.bio);
            if (avatarFile) formData.append('avatar', avatarFile);

            const response = await axios.put(`${API_URL}/profile/${loggedInUser._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.data.user) {
                const updatedUser = response.data.user;
                setProfileUser(updatedUser);
                localStorage.setItem('user', JSON.stringify(updatedUser));
                handleClose();
            }
        } catch (err) {
            console.error(err);
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profileUser) return <div className='w-full h-screen bg-gray-900 flex items-center justify-center text-white'>Loading Profile...</div>;
    if (!profileUser) return <div className='w-full h-screen bg-gray-900 flex items-center justify-center text-white'>User not found</div>;

    return (
        <div className='w-full min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
            <Header />
            <div className='flex'>
                <aside className='w-[20%]'>
                    <SideBar />
                </aside>

                <main className='flex-1 ml-[10px]'>
                    <div className='max-w-5xl mx-auto px-6 py-8'>
                        <div className='flex justify-between items-start gap-16 mb-12'>
                            <div className='shrink-0'>
                                <div className='relative'>
                                    <div className='h-40 w-40 rounded-full bg-[#8798EEFF] flex items-center justify-center text-5xl font-bold border-4 border-[#8798EEFF] shadow-2xl overflow-hidden'>
                                        {profileUser.avatar ? (
                                            <img src={profileUser.avatar} alt="Profile" className='h-full w-full object-cover' />
                                        ) : (
                                            <span>{profileUser.firstName?.charAt(0)}</span>
                                        )}
                                    </div>
                                    <div className='absolute bottom-3 right-3 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900'></div>
                                </div>
                            </div>

                            <div className='flex-1'>
                                <div className='flex items-baseline gap-4 mb-2'>
                                    <h1 className='text-3xl font-bold'>{profileUser.firstName} {profileUser.lastName}</h1>
                                    <span className='px-4 py-1 bg-[#8798EEFF] rounded-full text-[12px] font-semibold tracking-wide'>
                                        {isOwnProfile ? 'YOU' : 'MEMBER'}
                                    </span>
                                </div>
                                <p className='text-gray-400 flex items-center gap-2 mb-6'>
                                   <Mail size={16} /> {profileUser.email}
                                </p>

                                <div className='flex gap-12 mb-6'>
                                    <div className='text-center cursor-pointer hover:scale-105 transition-transform'>
                                        <p className='text-2xl font-bold text-white'>{stats.postCount}</p>
                                        <p className='text-gray-400 text-sm uppercase tracking-wider'>Posts</p>
                                    </div>
                                    <div className='text-center cursor-pointer hover:scale-105 transition-transform' onClick={handleFriendsOpen}>
                                        <p className='text-2xl font-bold text-white'>{stats.followers}</p>
                                        <p className='text-gray-400 text-sm uppercase tracking-wider'>Followers</p>
                                    </div>
                                    <div className='text-center cursor-pointer hover:scale-105 transition-transform' onClick={handleFriendsOpen}>
                                        <p className='text-2xl font-bold text-white'>{stats.following}</p>
                                        <p className='text-gray-400 text-sm uppercase tracking-wider'>Following</p>
                                    </div>
                                </div>

                                <div className='flex gap-4'>
                                    {isOwnProfile ? (
                                        <>
                                            <Button
                                                onClick={handleOpen}
                                                variant="outlined"
                                                sx={{
                                                    borderColor: '#8798EEFF', color: '#8798EEFF', textTransform: 'none',
                                                    fontSize: '16px', padding: '8px 24px', borderRadius: '12px', borderWidth: '2px',
                                                    '&:hover': { borderColor: '#8798EEFF', backgroundColor: '#8798EEFF', color: 'white' }
                                                }}
                                            >
                                                Edit Profile
                                            </Button>
                                            <Button
                                                onClick={handleFriendsOpen}
                                                variant="contained"
                                                sx={{
                                                    background: '#8798EEFF', textTransform: 'none', fontSize: '16px',
                                                    padding: '8px 24px', borderRadius: '12px',
                                                    '&:hover': { color: '#8798EEFF', borderColor: '#8798EEFF', backgroundColor: 'transparent' }
                                                }}
                                            >
                                                <Users className='w-5 h-5 mr-2' />
                                                Friends
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={handleFollow}
                                                variant={isFollowing ? "outlined" : "contained"}
                                                sx={{
                                                    background: isFollowing ? 'transparent' : '#8798EEFF',
                                                    color: isFollowing ? '#8798EEFF' : 'white',
                                                    borderColor: '#8798EEFF',
                                                    textTransform: 'none', fontSize: '16px', padding: '8px 24px', borderRadius: '12px',
                                                    '&:hover': { background: isFollowing ? '#8798EEFF' : 'transparent', color: isFollowing ? 'white' : '#8798EEFF' }
                                                }}
                                            >
                                                {isFollowing ? <UserMinus className='w-5 h-5 mr-2' /> : <UserPlus className='w-5 h-5 mr-2' />}
                                                {isFollowing ? 'Unfollow' : 'Follow'}
                                            </Button>
                                            <Button
                                                onClick={handleMessage}
                                                variant="contained"
                                                style={{ backgroundColor: '#22c55e' }}
                                                sx={{
                                                    textTransform: 'none', fontSize: '16px', padding: '8px 24px', borderRadius: '12px',
                                                }}
                                            >
                                                <MessageCircle className='w-5 h-5 mr-2' />
                                                Message
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='border-t border-gray-700 pt-8 mb-8'>
                            <h3 className='text-lg font-semibold mb-3'>About</h3>
                            <p className='text-gray-400 leading-relaxed max-w-2xl text-justify'>
                                {profileUser.bio || 'This user has not set a bio yet.'}
                            </p>
                        </div>

                        <div className='border-t border-gray-700 pt-6'>
                            <h3 className='text-lg font-semibold mb-8'>{isOwnProfile ? 'Your Gallery' : `${profileUser.firstName}'s Posts`}</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12'>
                                {stats.posts && stats.posts.length > 0 ? (
                                    stats.posts.map((post, i) => (
                                        <div key={i} className='flex flex-col bg-gray-800/40 rounded-2xl border border-gray-700/50 overflow-hidden hover:border-[#8798EEFF] transition-all duration-300 shadow-lg group'>
                                            <div className='aspect-video overflow-hidden'>
                                                <img src={post.image} alt="post" className='w-full h-full object-cover group-hover:scale-110 transition duration-700' />
                                            </div>
                                            <div className='p-4 flex flex-col gap-3'>
                                                {post.caption && <p className='text-[13px] text-gray-200 line-clamp-2 leading-relaxed h-[40px]'>{post.caption}</p>}
                                                <div className='flex items-center justify-between pt-2 border-t border-gray-700/50'>
                                                    <div className='flex gap-5'>
                                                        <div className='flex items-center gap-1.5'><Heart size={18} className='text-red-500' /><span className='text-sm font-bold text-gray-300'>{post.likes?.length || 0}</span></div>
                                                        <div className='flex items-center gap-1.5'><MessageCircle size={18} className='text-[#8798EEFF]' /><span className='text-sm font-bold text-gray-300'>{post.comments?.length || 0}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='col-span-full text-center py-12 text-gray-500 italic'>No posts shared yet.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit Profile Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: '#1a1c23', color: 'white', borderRadius: '24px', border: '1px solid #374151', padding: '12px' } }}>
                <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <div className='relative group cursor-pointer' onClick={() => document.getElementById('avatar-upload').click()}>
                                <div className='h-32 w-32 rounded-full border-4 border-[#8798EEFF] overflow-hidden bg-gray-800 flex items-center justify-center transition-all group-hover:brightness-50 shadow-xl'>
                                    {avatarFile ? <img src={URL.createObjectURL(avatarFile)} alt="Preview" className='h-full w-full object-cover' /> : (profileUser.avatar ? <img src={profileUser.avatar} alt="Current" className='h-full w-full object-cover' /> : <div className='text-4xl text-gray-500 font-bold'>{profileUser.firstName?.charAt(0)}</div>)}
                                </div>
                                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'><Camera size={32} className='text-white' /></div>
                                <input id='avatar-upload' type="file" className='hidden' accept='image/*' onChange={handleFileChange} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="First Name" name="firstName" value={editData.firstName} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#9ca3af' } }} inputProps={{ style: { color: 'white' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#374151' }, '&:hover fieldset': { borderColor: '#8798EEFF' } } }} />
                            <TextField label="Last Name" name="lastName" value={editData.lastName} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: '#9ca3af' } }} inputProps={{ style: { color: 'white' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#374151' }, '&:hover fieldset': { borderColor: '#8798EEFF' } } }} />
                        </Box>
                        <TextField label="Bio" name="bio" value={editData.bio} onChange={handleChange} fullWidth multiline rows={4} InputLabelProps={{ style: { color: '#9ca3af' } }} inputProps={{ style: { color: 'white' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#374151' }, '&:hover fieldset': { borderColor: '#8798EEFF' } } }} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose} disabled={loading} sx={{ color: '#9ca3af', textTransform: 'none' }}>Cancel</Button>
                    <Button onClick={handleSave} disabled={loading} variant="contained" sx={{ bgcolor: '#8798EEFF', textTransform: 'none', px: 4, borderRadius: '12px', fontWeight: 'bold', '&:hover': { bgcolor: '#7687d6' } }}>{loading ? 'Updating...' : 'Save Changes'}</Button>
                </DialogActions>
            </Dialog>

            {/* Friends Modal */}
            <Dialog open={friendsOpen} onClose={() => setFriendsOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { bgcolor: '#1a1c23', color: 'white', borderRadius: '24px', border: '1px solid #374151' } }}>
                <DialogTitle sx={{ p: 0 }}>
                    <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="fullWidth" sx={{ '& .MuiTabs-indicator': { bgcolor: '#8798EEFF' }, '& .MuiTab-root': { color: '#9ca3af', textTransform: 'none', fontSize: '16px', py: 2 }, '& .Mui-selected': { color: '#8798EEFF !important' } }}>
                        <Tab label={`Followers (${stats.followers || 0})`} />
                        <Tab label={`Following (${stats.following || 0})`} />
                    </Tabs>
                </DialogTitle>
                <DialogContent sx={{ minHeight: '300px', p: 2 }}>
                    <List>
                        {(tabValue === 0 ? friendsData.followers : friendsData.following).length > 0 ? (
                            (tabValue === 0 ? friendsData.followers : friendsData.following).map((friend, idx) => (
                                <ListItem key={idx} sx={{ px: 0, cursor: 'pointer' }} onClick={() => { navigate(`/profile/${friend._id}`); setFriendsOpen(false); }}>
                                    <ListItemAvatar><Avatar src={friend.avatar} sx={{ bgcolor: '#8798EEFF' }}>{friend.firstName?.charAt(0)}</Avatar></ListItemAvatar>
                                    <ListItemText primary={`${friend.firstName} ${friend.lastName}`} secondary={friend.email} primaryTypographyProps={{ sx: { color: 'white', fontWeight: 'bold' } }} secondaryTypographyProps={{ sx: { color: '#9ca3af', fontSize: '12px' } }} />
                                </ListItem>
                            ))
                        ) : (
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 8, opacity: 0.5 }}><Users size={48} /><p className='mt-2'>No data yet</p></Box>
                        )}
                    </List>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Profile
