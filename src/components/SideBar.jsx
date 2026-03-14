import React from 'react'
import { nav } from "../data/dashboard";
import { LogOut } from 'lucide-react';

const SideBar = () => {
  return (
    <div className='flex flex-col gap-4 border-[1px] border-black   w-[250px] p-5 rounded-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      {nav.map((x, i) => (
        <div
          key={i}
          className="flex gap-3 h-[52px] w-[220px] items-center border border-slate-200 pl-3 rounded-xl bg-gray-300 shadow-[50px]} hover:shadow-md hover:bg-[#8798EEFF] transition duration-200 cursor-pointer hover:translate-x-4 hover:shadow-[#8798EEFF] "
        >
          <span className="text-slate-600">{<x.name />}</span>
          <h3 className="font-medium text-slate-800">{x.label}</h3>
        </div>
      ))}
      <div className='flex gap-3 h-[52px] w-[220px] items-center border border-slate-200 pl-3 rounded-xl bg-red-500 shadow-[50px]} hover:shadow-md hover:bg-[#8798EEFF] transition duration-200 cursor-pointer hover:translate-x-4 hover:shadow-[#8798EEFF] "
              '>
        <span className="text-white">
          <LogOut/>
        </span>
        <h3 className="font-medium text-white">Logout</h3>
      </div>
    </div>
  )
}

export default SideBar
