import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import axios from 'axios';
import { API_URL } from '../config/config';
import { useSelector } from 'react-redux';

const CommentModal = ({ isOpen, onClose, postId, onCommentAdded, existingComments = [] }) => {
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const user = useSelector((state) => state.user.user) || {};

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsSubmitting(true);
        try {
            const commentData = {
                text: comment,
                userId: user._id,
                authorName: `${user.firstName || 'User'} ${user.lastName || ''}`,
                authorId: user.email || 'user123',
                authorAvatar: user.avatar || null
            };

            const response = await axios.post(`${API_URL}/posts/${postId}/comment`, commentData);

            if (response.status === 200) {
                setComment('');
                onCommentAdded(response.data.comments);
                onClose();
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            alert("Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-[#1e2330] border border-gray-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                    <h3 className="text-xl font-semibold text-white">Comments</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-800"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Comments List */}
                <div className="max-h-[400px] overflow-y-auto p-4 space-y-4">
                    {existingComments.length > 0 ? (
                        existingComments.map((c, idx) => (
                            <div key={c._id || idx} className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
                                <div className="h-8 w-8 rounded-full bg-[#8798EE] flex items-center justify-center text-white text-xs font-bold shrink-0">
                                    {c.authorName ? c.authorName.charAt(0) : 'U'}
                                </div>
                                <div className="flex-1 bg-gray-800/50 rounded-2xl p-3 border border-gray-700/50">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-bold text-white">{c.authorName}</span>
                                        <span className="text-[10px] text-gray-500">
                                            {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Just now'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-300 leading-relaxed">{c.text}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-500 italic">
                            No comments yet. Be the first to comment!
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <form onSubmit={handleSubmit} className="p-4 bg-gray-900/50 border-t border-gray-700">
                    <div className="flex gap-3 items-center">
                        <div className="h-10 w-10 rounded-full bg-[#8798EE] flex items-center justify-center text-white font-bold shrink-0">
                            {user.firstName ? user.firstName.charAt(0) : 'U'}
                        </div>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Write a comment..."
                                className="w-full bg-gray-800 border border-gray-700 text-white rounded-full py-2.5 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#8798EEFF] focus:border-transparent transition-all"
                                disabled={isSubmitting}
                            />
                            <button
                                type="submit"
                                disabled={!comment.trim() || isSubmitting}
                                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${comment.trim() && !isSubmitting
                                        ? 'text-[#8798EE] hover:bg-gray-700'
                                        : 'text-gray-600'
                                    }`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CommentModal;
