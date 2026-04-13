import React, { useState, useEffect } from 'react'
import { MessageCircle, Heart, Share2, Bookmark, Trash2 } from "lucide-react";
import axios from 'axios';
import { API_URL } from '../config/config';
import { showToast } from '../utils/toast';
import CommentModal from '../components/CommentModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostCard({ post, onPostDeleted }) {
    const user = useSelector((state) => state.user.user) || {};
    const [likes, setLikes] = useState(post?.likes || []);
    const [comments, setComments] = useState(post?.comments || []);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    if (!post) return null;

    const { authorName, authorId, caption, image, createdAt, _id, userId } = post;
    const [isSaved, setIsSaved] = useState(false);
    const timeAgo = createdAt ? new Date(createdAt).toLocaleDateString() : 'Just now';
    const isLiked = likes.includes(user.email);

    // Check if post is saved by the user on mount
    useEffect(() => {
        const checkSaved = async () => {
            if (user._id && _id) {
                try {
                    const response = await axios.get(`${API_URL}/posts/saved/${user._id}`);
                    const savedPosts = response.data.posts || [];
                    setIsSaved(savedPosts.some(p => p._id === _id));
                } catch (error) {
                    console.error("Error checking saved status:", error);
                }
            }
        };
        checkSaved();
    }, [_id, user._id]);

    const handleLike = async () => {
        if (!_id || !user.email) return;

        // Optimistic UI update
        const newLikes = isLiked
            ? likes.filter(id => id !== user.email)
            : [...likes, user.email];
        setLikes(newLikes);

        try {
            const response = await axios.put(`${API_URL}/posts/${_id}/like`, { userId: user.email });
            if (response.data.likes) {
                setLikes(response.data.likes);
            }
        } catch (error) {
            console.error("Error liking post:", error);
            setLikes(likes); // Revert on error
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await axios.delete(`${API_URL}/posts/${_id}`);
            if (onPostDeleted) onPostDeleted(_id);
            else window.location.reload(); // Fallback
            showToast.success("Post deleted successfully");
        } catch (error) {
            console.error("Error deleting post:", error);
            showToast.error("Failed to delete post");
        }
    };

    const handleSave = async () => {
        if (!_id || !user._id) return;
        try {
            const response = await axios.post(`${API_URL}/posts/save`, {
                userId: user._id,
                postId: _id
            });
            setIsSaved(response.data.saved);
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    return (
        <div className='bg-theme-card border border-theme-border rounded-xl overflow-hidden mb-8 shadow-2xl transition-all hover:border-theme-accent/30 w-[550px]  '>
            <div className='p-5'>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-3'>
                        <Link to={userId ? `/profile/${userId}` : '/profile'} className='h-10 w-10 rounded-lg bg-theme-accent flex items-center justify-center text-black font-bold shrink-0'>
                            {authorName ? (
                                <span className='text-white'>{authorName.charAt(0)}</span>
                            ) : (
                                <span className='text-white'>U</span>
                            )}
                        </Link>
                        <div>   
                        <Link to={userId ? `/profile/${userId}` : '/profile'} className='font-bold text-theme-text hover:text-theme-accent transition-colors text-[14px]'>{authorName || 'User'}</Link>
                            <p className='text-[10px] text-theme-text-muted font-bold uppercase tracking-widest'>{timeAgo}</p>
                        </div>
                    </div>
                    {(userId === user._id || authorId === user.email) && (
                        <button onClick={handleDelete} className='text-theme-text-muted hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-gray-800'>
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                <p className='text-theme-text-secondary text-[15px] leading-relaxed mb-4 font-normal'>{caption}</p>

                {image && (
                    <div className='rounded-xl overflow-hidden border border-theme-border mb-4 bg-black/20'>
                        <img src={image} alt="Post content" className='w-full max-h-[500px] object-contain mx-auto' />
                    </div>
                )}

                <div className='flex items-center justify-between pt-4 border-t border-theme-border'>
                    <div className='flex gap-6'>
                        <div className='flex items-center gap-2 cursor-pointer group' onClick={handleLike}>
                            <Heart size={20} className={`${isLiked ? 'fill-theme-accent text-theme-accent' : 'text-theme-text-muted group-hover:text-theme-accent'} transition-all active:scale-125`} />
                            {likes.length > 0 && <span className='text-xs font-bold text-theme-text-muted'>{likes.length}</span>}
                        </div>
                        <div className='flex items-center gap-2 cursor-pointer group' onClick={() => setIsCommentModalOpen(true)}>
                            <MessageCircle size={20} className='text-theme-text-muted group-hover:text-theme-accent transition-all active:scale-125' />
                            {comments.length > 0 && <span className='text-xs font-bold text-theme-text-muted'>{comments.length}</span>}
                        </div>
                        <Share2 size={20} className='text-theme-text-muted hover:text-theme-accent cursor-pointer transition-all active:scale-125' />
                    </div>
                    <div className='cursor-pointer group' onClick={handleSave}>
                        <Bookmark size={20} className={`${isSaved ? 'fill-theme-accent text-theme-accent' : 'text-theme-text-muted group-hover:text-theme-accent'} transition-all active:scale-125`} />
                    </div>
                </div>
            </div>

            <CommentModal
                isOpen={isCommentModalOpen}
                onClose={() => setIsCommentModalOpen(false)}
                postId={_id}
                existingComments={comments}
                onCommentAdded={(newComments) => setComments(newComments)}
            />
        </div>
    );
}

export default PostCard;
