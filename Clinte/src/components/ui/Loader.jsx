import React from "react";

const Loader = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white via-blue-50 to-white'>
      <div className='relative'>
        <div className='w-14 h-14 rounded-full border-4 border-blue-100'></div>
        <div className='absolute top-0 left-0 w-14 h-14 border-4 border-transparent border-t-blue-600 border-r-blue-400 rounded-full animate-spin'></div>
      </div>
      <p className='mt-4 text-gray-500 text-lg tracking-wide animate-pulse'>
        Loading...
      </p>
    </div>
  );
};

export default Loader;
