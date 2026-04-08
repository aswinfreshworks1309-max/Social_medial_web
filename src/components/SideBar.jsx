import React from 'react'
import { nav } from "../data/dashboard";
import { LogOut } from 'lucide-react';
import { Link } from "react-router-dom";


import { useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className='flex flex-col gap-4 border border-gray-700 w-[250px] p-5 rounded-2xl bg-black shadow-2xl h-[calc(100vh-120px)] sticky top-[100px] ml-6'>
      <div className='flex flex-col gap-3 flex-1 bg-black '>
        {nav.map((x, i) => (
          <Link to={x.path} key={i}>
            <div className="flex gap-4 h-[55px] items-center px-4 rounded-xl transition-all duration-300 cursor-pointer group hover:bg-[#5DD3B6] hover:translate-x-2 bg-black border border-transparent hover:text-black hover:border-gray-600">
              <span className="text-[#5DD3B6]  group-hover:text-black transition-colors">{<x.name size={24} />}</span>
              <h3 className="font-semibold text-[#5DD3B6] group-hover:text-black  transition-colors">{x.label}</h3>
            </div>
          </Link>
        ))}
      </div>

      <div
        onClick={handleLogout}
        className='flex gap-4 h-[55px] items-center px-4 rounded-xl bg-red-500/10 border border-red-500/20 transition-all duration-300 cursor-pointer group hover:bg-red-500 hover:translate-x-2'
      >
        <span className="text-red-500 group-hover:text-white transition-colors">
          <LogOut size={24} />
        </span>
        <h3 className="font-semibold text-red-500 group-hover:text-white transition-colors">Logout</h3>
      </div>
    </div>
  )
}

export default SideBar
