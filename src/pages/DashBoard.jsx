import React from "react";
import profile from "../assets/profile.png";
import Button from "@mui/material/Button";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import PostCard from "./Post";

const DashBoard = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <Header />
            <div className="min-h-screen w-[800px] flex gap-[200px] p-6">

                <aside className="flex gap-4 flex-col">
                    <SideBar />
                </aside>


                <div className="flex justify-start items-start flex-col w-full ">
                    {/* Create Post */}
                    <div className="flex justify-start flex-col gap-5 w-full border border-slate-200 p-6 rounded-2xl bg-gray-200 shadow-sm">
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
                                className="h-[50px] w-[500px] border border-gary-800 p-3 rounded-xl  focus:ring-indigo-200 focus:outline-none bg-gray-200"
                            />
                        </div>

                        <hr className="border-gray-800" />

                        <div className="flex justify-between items-center p-2">
                            <div className="flex gap-4">
                                <Button
                                    variant="contained"
                                    sx={{ bgcolor: "#9898EEFF " }}
                                >
                                    Photo
                                </Button>

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
                    <PostCard />
                    <PostCard />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;


