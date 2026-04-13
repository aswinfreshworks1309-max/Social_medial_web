import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Tabs, Tab, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { User, MessageCircle, Mail, Camera, Heart, Users, UserPlus, UserMinus } from 'lucide-react'
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import axios from 'axios';
import { API_URL } from '../config/config';
import { showToast } from '../utils/toast';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user.user) || {};
    
    const [profileUser, setProfileUser] = useState(null);
    const [isOwnProfile, setIsOwnProfile] = useState(!id || id === loggedInUser._id);
    const [isFollowing, setIsFollowing] = useState(false);
    
    const [open, setOpen] = useState(false);
    const [friendsOpen, setFriendsOpen] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [galleryTab, setGalleryTab] = useState('posts');
    const [savedPosts, setSavedPosts] = useState([]);
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

    const fetchSavedPosts = async () => {
        try {
            const response = await axios.get(`${API_URL}/posts/saved/${loggedInUser._id}`);
            setSavedPosts(response.data.posts || []);
        } catch (err) {
            console.error("Error fetching saved posts:", err);
        }
    };

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
                fetchSavedPosts(); // Fetch saved posts for own profile
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
                dispatch(setUser(updatedUser));
                handleClose();
                showToast.success("Profile updated successfully!");
            }
        } catch (err) {
            console.error(err);
            showToast.error("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading && !profileUser) return <div className='w-full h-screen bg-theme-bg flex items-center justify-center text-theme-text'>Loading Profile...</div>;
    if (!profileUser) return <div className='w-full h-screen bg-theme-bg flex items-center justify-center text-theme-text'>User not found</div>;

    return (
        <div className='w-full min-h-screen bg-theme-bg text-theme-text'>
            <Header />
            <div className='flex mt-[20px] '>
                <aside className='w-[20%] '>
                    <SideBar />
                </aside>

                <main className='flex-1 ml-[10px]'>
                    <div className='max-w-5xl mx-auto px-6 py-8'>
                        <div className='flex justify-between items-start gap-16 mb-12'>
                            <div className='shrink-0'>
                                <div className='relative'>
                                    <div className='h-40 w-40 rounded-full bg-theme-accent flex items-center justify-center text-5xl font-bold border-4 border-theme-accent shadow-2xl overflow-hidden'>
                                        {profileUser.avatar ? (
                                            <img src={profileUser.avatar} alt="Profile" className='h-full w-full object-cover' />
                                        ) : (
                                            <span className='text-white'>{profileUser.firstName?.charAt(0) || "U"}</span>
                                        )}
                                    </div>
                                    <div className='absolute bottom-3 right-3 w-5 h-5 bg-green-400 rounded-full border-2 border-slate-900'></div>
                                </div>
                            </div>

                            <div className='flex-1'>
                                <div className='flex items-baseline gap-4 mb-2'>
                                    <h1 className='text-3xl font-bold'>{profileUser.firstName} {profileUser.lastName}</h1>
                                    <span className='px-4 py-1 bg-theme-accent rounded-full text-[12px] font-semibold tracking-wide text-white'>
                                        {isOwnProfile ? 'YOU' : 'USER'}
                                    </span>
                                </div>
                                <p className='text-theme-text-muted flex items-center gap-2 mb-6'>
                                   <Mail size={16} /> {profileUser.email}
                                </p>

                                <div className='flex gap-12 mb-6'>
                                    <div className='text-center cursor-pointer hover:scale-105 transition-transform'>
                                        <p className='text-2xl font-bold '>{stats.postCount}</p>
                                        <p className='text-theme-text-muted text-sm uppercase tracking-wider'>Posts</p>
                                    </div>
                                    <div className='text-center cursor-pointer hover:scale-105 transition-transform' onClick={handleFriendsOpen}>
                                        <p className='text-2xl font-bold '>{stats.followers}</p>
                                        <p className='text-theme-text-muted text-sm uppercase tracking-wider'>Followers</p>
                                    </div>
                                    <div className='text-center cursor-pointer hover:scale-105 transition-transform' onClick={handleFriendsOpen}>
                                        <p className='text-2xl font-bold '>{stats.following}</p>
                                        <p className='text-theme-text-muted text-sm uppercase tracking-wider'>Following</p>
                                    </div>
                                </div>

                                <div className='flex gap-4'>
                                    {isOwnProfile ? (
                                        <>
                                            <Button
                                                onClick={handleOpen}
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'var(--theme-accent)', color: 'var(--theme-accent)', textTransform: 'none',
                                                    fontSize: '16px', padding: '8px 24px', borderRadius: '12px', borderWidth: '2px',
                                                    '&:hover': { borderColor: 'var(--theme-accent)', backgroundColor: 'var(--theme-accent)', color: 'white' }
                                                }}
                                            >
                                                Edit Profile
                                            </Button>
                                            <Button
                                                onClick={handleFriendsOpen}
                                                variant="contained"
                                                sx={{
                                                    background: 'var(--theme-accent)', textTransform: 'none', fontSize: '16px',
                                                    padding: '8px 24px', borderRadius: '12px',color:'white',    
                                                    '&:hover': { color: 'var(--theme-accent)', borderColor: 'var(--theme-accent)', backgroundColor: 'transparent' }
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
                                                    background: isFollowing ? 'transparent' : 'var(--theme-accent)',
                                                    color: isFollowing ? 'var(--theme-accent)' : 'white',
                                                    borderColor: 'var(--theme-accent)',
                                                    textTransform: 'none', fontSize: '16px', padding: '8px 24px', borderRadius: '12px',
                                                    '&:hover': { background: isFollowing ? 'var(--theme-accent)' : 'transparent', color: isFollowing ? 'white' : 'var(--theme-accent)' }
                                                }}
                                            >
                                                {isFollowing ? <UserMinus className='w-5 h-5 mr-2' /> : <UserPlus className='w-5 h-5 mr-2' />}
                                                {isFollowing ? 'Unfollow' : 'Follow'}
                                            </Button>
                                            <Button
                                                onClick={handleMessage}
                                                variant="contained"
                                                sx={{
                                                    bgcolor: 'var(--theme-success)',
                                                    color: 'white',
                                                    textTransform: 'none', fontSize: '16px', padding: '8px 24px', borderRadius: '12px',
                                                    '&:hover': { bgcolor: 'var(--theme-success-hover)' }
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

                        <div className='border-t border-theme-divider pt-8 mb-8'>
                            <h3 className='text-lg font-semibold mb-3'>About</h3>
                            <p className='text-theme-text leading-relaxed max-w-2xl text-justify'>
                                {profileUser.bio || 'This user has not set a bio yet.'}
                            </p>
                        </div>

                        <div className='border-t border-gray-700 pt-6'>
                            <div className='flex items-center justify-between mb-8'>
                                <h3 className='text-lg font-semibold'>{isOwnProfile ? 'Your Gallery' : `${profileUser.firstName}'s Posts`}</h3>
                                {isOwnProfile && (
                                    <div className='flex gap-2 bg-theme-card/50 p-1 rounded-xl border border-theme-border'>
                                        <button 
                                            onClick={() => setGalleryTab('posts')}
                                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${galleryTab === 'posts' ? 'bg-theme-accent text-white shadow-lg' : 'text-theme-text-muted hover:text-theme-text'}`}
                                        >
                                            Posts
                                        </button>
                                        <button 
                                            onClick={() => setGalleryTab('saved')}
                                            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${galleryTab === 'saved' ? 'bg-theme-accent text-white shadow-lg' : 'text-theme-text-muted hover:text-theme-text'}`}
                                        >
                                            Saved
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12'>
                                {(galleryTab === 'posts' ? stats.posts : savedPosts).length > 0 ? (
                                    (galleryTab === 'posts' ? stats.posts : savedPosts).map((post, i) => (
                                        <div key={i} className='flex flex-col bg-theme-card/40 rounded-2xl border border-theme-border overflow-hidden hover:border-theme-accent transition-all duration-300 shadow-lg group'>
                                            <div className='aspect-video overflow-hidden'>
                                                <img src={post.image} alt="post" className='w-full h-full object-cover group-hover:scale-110 transition duration-700' />
                                            </div>
                                            <div className='p-4 flex flex-col gap-3'>
                                                {post.caption && <p className='text-[13px] text-gray-200 line-clamp-2 leading-relaxed h-[40px]'>{post.caption}</p>}
                                                <div className='flex items-center justify-between pt-2 border-t border-theme-divider'>
                                                    <div className='flex gap-5'>
                                                        <div className='flex items-center gap-1.5'><Heart size={18} className='text-red-500' /><span className='text-sm font-bold text-theme-text-muted'>{post.likes?.length || 0}</span></div>
                                                        <div className='flex items-center gap-1.5'><MessageCircle size={18} className='text-theme-accent' /><span className='text-sm font-bold text-theme-text-muted'>{post.comments?.length || 0}</span></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='col-span-full text-center py-12 text-theme-text-muted italic'>
                                        {galleryTab === 'posts' ? 'No posts shared yet.' : 'No saved posts yet.'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Edit Profile Modal */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { bgcolor: 'var(--theme-card-bg)', color: 'var(--theme-text)', borderRadius: '24px', border: '1px solid var(--theme-border)', padding: '12px' } }}>
                <DialogTitle sx={{ fontSize: '24px', fontWeight: 'bold' }}>Edit Profile</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                            <div className='relative group cursor-pointer' onClick={() => document.getElementById('avatar-upload').click()}>
                                <div className='h-32 w-32 rounded-full border-4 border-theme-accent overflow-hidden bg-theme-bg flex items-center justify-center transition-all group-hover:brightness-50 shadow-xl'>
                                    {avatarFile ? <img src={URL.createObjectURL(avatarFile)} alt="Preview" className='h-full w-full object-cover' /> : (profileUser.avatar ? <img src={profileUser.avatar} alt="Current" className='h-full w-full object-cover' /> : <div className='text-4xl text-theme-text-muted font-bold'>{profileUser.firstName?.charAt(0)}</div>)}
                                </div>
                                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'><Camera size={32} className='text-white' /></div>
                                <input id='avatar-upload' type="file" className='hidden' accept='image/*' onChange={handleFileChange} />
                            </div>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <TextField label="First Name" name="firstName" value={editData.firstName} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: 'var(--theme-text-muted)' } }} inputProps={{ style: { color: 'var(--theme-text)' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--theme-border)' }, '&:hover fieldset': { borderColor: 'var(--theme-accent)' } } }} />
                            <TextField label="Last Name" name="lastName" value={editData.lastName} onChange={handleChange} fullWidth InputLabelProps={{ style: { color: 'var(--theme-text-muted)' } }} inputProps={{ style: { color: 'var(--theme-text)' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--theme-border)' }, '&:hover fieldset': { borderColor: 'var(--theme-accent)' } } }} />
                        </Box>
                        <TextField label="Bio" name="bio" value={editData.bio} onChange={handleChange} fullWidth multiline rows={4} InputLabelProps={{ style: { color: 'var(--theme-text-muted)' } }} inputProps={{ style: { color: 'var(--theme-text)' } }} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'var(--theme-border)' }, '&:hover fieldset': { borderColor: 'var(--theme-accent)' } } }} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 3 }}>
                    <Button onClick={handleClose} disabled={loading} sx={{ color: 'black', textTransform: 'none' }}>Cancel</Button>
                    <Button onClick={handleSave} disabled={loading} variant="contained" sx={{ bgcolor: 'var(--theme-accent)', color: 'white', textTransform: 'none', px: 4, borderRadius: '12px', fontWeight: 'bold', '&:hover': { bgcolor: 'var(--theme-accent-hover)' } }}>{loading ? 'Updating...' : 'Save Changes'}</Button>
                </DialogActions>
            </Dialog>

            {/* Friends Modal */}
            <Dialog open={friendsOpen} onClose={() => setFriendsOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { bgcolor: 'var(--theme-card-bg)', color: 'var(--theme-text)', borderRadius: '24px', border: '1px solid var(--theme-border)' } }}>
                <DialogTitle sx={{ p: 0 }}>
                    <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="fullWidth" sx={{ '& .MuiTabs-indicator': { bgcolor: 'var(--theme-accent)' }, '& .MuiTab-root': { color: 'var(--theme-text-muted)', textTransform: 'none', fontSize: '16px', py: 2 }, '& .Mui-selected': { color: 'var(--theme-accent) !important' } }}>
                        <Tab label={`Followers (${stats.followers || 0})`} />
                        <Tab label={`Following (${stats.following || 0})`} />
                    </Tabs>
                </DialogTitle>
                <DialogContent sx={{ minHeight: '300px', p: 2 }}>
                    <List>
                        {(tabValue === 0 ? friendsData.followers : friendsData.following).length > 0 ? (
                            (tabValue === 0 ? friendsData.followers : friendsData.following).map((friend, idx) => (
                                <ListItem key={idx} sx={{ px: 0, cursor: 'pointer' }} onClick={() => { navigate(`/profile/${friend._id}`); setFriendsOpen(false); }}>
                                    <ListItemAvatar><Avatar src={friend.avatar} sx={{ bgcolor: 'var(--theme-accent)', color: 'black' }}>{friend.firstName?.charAt(0)}</Avatar></ListItemAvatar>
                                    <ListItemText primary={`${friend.firstName} ${friend.lastName}`} secondary={friend.email} primaryTypographyProps={{ sx: { color: 'var(--theme-text)', fontWeight: 'bold' } }} secondaryTypographyProps={{ sx: { color: 'var(--theme-text-muted)', fontSize: '12px' } }} />
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
