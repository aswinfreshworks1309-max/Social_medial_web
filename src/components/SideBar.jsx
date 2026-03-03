import React from 'react'
import { nav } from "../data/dashboard";

const SideBar = () => {
  return (
    <div className='flex flex-col gap-4'>
          {nav.map((x, i) => (
              <div
                  key={i}
                  className="flex gap-3 h-[52px] w-[220px] items-center border border-slate-200 pl-3 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-slate-50 transition-all cursor-pointer hover:translate-x-4"
              >
                  <span className="text-slate-600">{<x.name />}</span>
                  <h3 className="font-medium text-slate-800">{x.label}</h3>
              </div>
          ))}
    </div>
  )
}

export default SideBar
