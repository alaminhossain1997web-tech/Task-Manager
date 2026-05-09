import React from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { useGetProfileQuery, useLogoutMutation } from "../../Services/api";
import { useNavigate } from "react-router";

const Navbar = () => {
  const { data } = useGetProfileQuery();
  const [logout] = useLogoutMutation();
  const navigate = useNavigate()
    const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='mb-10'>
        <nav className='flex justify-between items-center bg-blue-700 py-1.5 px-2 rounded-2xl'>
          <div className='flex items-center gap-4'>
            <div className='bg-black text-xl font-bold text-white rounded-full p-1.5'>
              TM
            </div>

            <div className='text-xl font-bold text-white'>Task Manager</div>
          </div>

          <div className='flex justify-center items-center gap-2 pr-4'>
            <div className='w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-md bg-gray-200 border border-black'>
              {data?.avatar ? (
                <img
                  src={data.avatar}
                  alt='profile'
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='font-semibold'>
                  {data?.fullName?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <p className='text-base font-semibold text-white hidden sm:block'>
              {data?.fullName}
            </p>
               <button onClick={handleLogout} className="cursor-pointer"><RiLogoutBoxRLine className="text-xl text-black"/></button>
          </div>
        </nav>
    </div>
  );
};

export default Navbar;
