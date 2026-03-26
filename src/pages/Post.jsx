import React, { useState } from 'react'
import { MessageCircle, Heart, Share2, Bookmark, Trash2 } from "lucide-react";
import axios from 'axios';
import { API_URL } from '../config/config';
import CommentModal from '../components/CommentModal';
import { Link } from 'react-router-dom';

function PostCard({ post, onPostDeleted }) {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const [likes, setLikes] = useState(post?.likes || []);
    const [comments, setComments] = useState(post?.comments || []);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    if (!post) return null;

    const { authorName, authorId, caption, image, createdAt, _id, userId } = post;
    const [isSaved, setIsSaved] = useState(false); // Initial state, could be prop-driven
    const timeAgo = createdAt ? new Date(createdAt).toLocaleDateString() : 'Just now';
    const isLiked = likes.includes(user.email);

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
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post");
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
        <div className='bg-white border border-gray-100 rounded-xl overflow-hidden mb-8 shadow-sm transition-all hover:shadow-md w-full mx-auto '>
            <div className='p-5'>
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex items-center gap-3'>
                        <Link to={userId ? `/profile/${userId}` : '/profile'} className='h-10 w-10 rounded-lg bg-black flex items-center justify-center text-white font-bold shrink-0'>
                            {authorName ? (
                                <span className='text-sm'>{authorName.charAt(0)}</span>
                            ) : (
                                <span className='text-sm'>U</span>
                            )}
                        </Link>
                        <div>
                            <Link to={userId ? `/profile/${userId}` : '/profile'} className='font-bold text-black hover:underline text-[14px]'>{authorName || 'User'}</Link>
                            <p className='text-[10px] text-gray-400 font-bold uppercase tracking-widest'>{timeAgo}</p>
                        </div>
                    </div>
                    {userId === user._id && (
                        <button onClick={handleDelete} className='text-gray-300 hover:text-black transition-colors p-1.5 rounded-lg hover:bg-gray-50'>
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                <p className='text-gray-800 text-[15px] leading-relaxed mb-4 font-medium'>{caption}</p>

                {image && (
                    <div className='rounded-xl overflow-hidden border border-gray-50 mb-4 bg-gray-50'>
                        <img src={image} alt="Post content" className='w-full max-h-[500px] object-contain mx-auto' />
                    </div>
                )}

                <div className='flex items-center justify-between pt-4 border-t border-gray-50'>
                    <div className='flex gap-6'>
                        <div className='flex items-center gap-2 cursor-pointer group' onClick={handleLike}>
                            <Heart size={20} className={`${isLiked ? 'fill-black text-black' : 'text-gray-300 group-hover:text-black'} transition-all active:scale-125`} />
                            {likes.length > 0 && <span className='text-xs font-bold text-black'>{likes.length}</span>}
                        </div>
                        <div className='flex items-center gap-2 cursor-pointer group' onClick={() => setIsCommentModalOpen(true)}>
                            <MessageCircle size={20} className='text-gray-300 group-hover:text-black transition-all active:scale-125' />
                            {comments.length > 0 && <span className='text-xs font-bold text-black'>{comments.length}</span>}
                        </div>
                        <Share2 size={20} className='text-gray-300 hover:text-black cursor-pointer transition-all active:scale-125' />
                    </div>
                    <div className='cursor-pointer group' onClick={handleSave}>
                        <Bookmark size={20} className={`${isSaved ? 'fill-black text-black' : 'text-gray-300 group-hover:text-black'} transition-all active:scale-125`} />
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
