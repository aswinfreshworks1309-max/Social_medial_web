import React from "react";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import boy from "../assets/boy.png";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const DashBoard = () => {
    return (
        <>
            <Header/>
        <div
            className="min-h-screen w-full flex gap-6 p-6"
      
        >
       
            <aside className="flex gap-4 flex-col">
                <SideBar/>
            </aside>

       
            <div className="flex justify-start items-start flex-col w-full">
                {/* Create Post */}
                <div className="flex justify-start flex-col gap-5 w-full border border-slate-200 p-6 rounded-2xl bg-white shadow-sm">
                    <div className="flex gap-5 justify-center items-center">
                        <div className="h-[50px] w-[50px] rounded-full border-2 border-slate-200 relative overflow-hidden">
                            <img
                                src={profile}
                                alt="Profile"
                                className="h-full w-full rounded-full object-cover"
                            />
                            <div className="bg-green-500 w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 border-2 border-white"></div>
                        </div>

                        <input
                            type="text"
                            placeholder="What is on your mind?"
                            className="h-[50px] w-[500px] border border-slate-300 p-3 rounded-xl  focus:ring-indigo-200 focus:outline-none bg-slate-50"
                        />
                    </div>

                    <hr className="border-slate-200" />

                    <div className="flex justify-between items-center p-2">
                        <div className="flex gap-4">
                            <Button
                                variant="contained"
                                className="!bg-indigo-500 hover:!bg-indigo-600 !rounded-xl !shadow-none"
                            >
                                Photo
                            </Button>
                            <div className="text-slate-600 flex items-center">
                                Feeling/activity
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="success"
                            className="!bg-emerald-500 hover:!bg-emerald-600 !rounded-xl !shadow-none"
                        >
                            Post
                        </Button>
                    </div>
                </div>

                {/* Post Card 1 */}
                <PostCard />

                {/* Post Card 2 */}
                <PostCard />
            </div>
            </div>
        </>
    );
};

export default DashBoard;


function PostCard() {
    return (
        <div className="h-full border border-slate-200 w-full mt-6 rounded-2xl p-6 flex flex-col gap-5 bg-white shadow-sm hover:shadow-md transition-all">
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
