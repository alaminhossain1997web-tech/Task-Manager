import React from "react";
import { LuCircleUserRound } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="mb-10">
      
        <div className='container'>
            <nav className='flex justify-between items-center bg-blue-700 py-1.5 px-2 rounded-2xl'>
         
          <div className='flex items-center gap-4'>
            <div className='bg-black text-xl font-bold text-white rounded-full p-1.5'>
              TM
            </div>
            <div className='text-xl font-bold text-white'>Task Manager</div>
          </div>

          <div className='bg-black text-xl font-bold text-white rounded-full p-1.5'>
            <LuCircleUserRound className="text-3xl" />
          </div>

          </nav>
        </div>
      
    </div>
  );
};

export default Navbar;
