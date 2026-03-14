import React from 'react'
import { MessageCircle, Heart, Share2 } from "lucide-react";
import boy from "../assets/boy.png";



function PostCard() {
    return (
        <div className="h-full border border-slate-200  mt-6 rounded-2xl p-6 flex flex-col gap-5 bg-gray-200 shadow-sm hover:shadow-md transition-all w-[700px]">
            <div className="flex gap-3 items-center">
                <img
                    src={boy}
                    alt=""
                    className="rounded-full object-cover h-[56px] w-[56px]"
                />
                <div className="w-[200px]">
                    <b className="text-slate-800">Alex Rivera</b>
                    <p className="text-slate-500 text-sm">@arivera • 2h ago</p>
                </div>
            </div>

            <div>
                <p className="text-slate-700 leading-relaxed">
                    Just finished building the new layout for ConnectHub. The teal and
                    purple gradient looks amazing in the dark theme as well! What do you
                    guys think?
                </p>
            </div>

            <div className="flex justify-center items-center w-full h-[300px]">
                <img
                    src={boy}
                    alt="boy"
                    className="w-[400px] h-[300px] object-cover rounded-xl"
                />
            </div>

            <hr className="border-slate-200" />

            <div className="flex justify-between items-center p-2">
                <div className="flex gap-6 text-slate-500">
                    <MessageCircle className="cursor-pointer hover:text-indigo-500 transition-colors" />
                    <Heart
                        className="cursor-pointer hover:scale-110 transition-transform"
                        color="red"
                        fill="red"
                    />
                    <Share2 className="cursor-pointer hover:text-indigo-500 transition-colors" />
                </div>
            </div>
        </div>
    );
}
export default PostCard;
