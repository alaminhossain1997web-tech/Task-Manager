import React, { useState } from "react";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useGetProfileQuery, useLogoutMutation } from "../../Services/api";

const Navbar = () => {
  const { data } = useGetProfileQuery();
  const [logout, { isLoading }] = useLogoutMutation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      navigate("/login");
    } catch (error) {
      toast.error(error?.data?.message || "Logout failed. Please try again.");
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
          <div className='relative'>
            <button
              type='button'
              onClick={() => setIsProfileMenuOpen((isOpen) => !isOpen)}
              className='w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-md bg-gray-200 border border-black cursor-pointer'
              aria-label='Open profile menu'
              aria-expanded={isProfileMenuOpen}
            >
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
            </button>

            {isProfileMenuOpen && (
              <div className='absolute right-0 top-12 z-50 w-36 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg'>
                <Link
                  to='/update-profile'
                  onClick={() => setIsProfileMenuOpen(false)}
                  className='block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50'
                >
                  Update profile
                </Link>
              </div>
            )}
          </div>

          <p className='text-base font-semibold text-white hidden sm:block'>
            {data?.fullName}
          </p>

          <button
            type='button'
            onClick={handleLogout}
            disabled={isLoading}
            className='cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
            aria-label='Log out'
          >
            <RiLogoutBoxRLine className='text-xl text-black' />
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
