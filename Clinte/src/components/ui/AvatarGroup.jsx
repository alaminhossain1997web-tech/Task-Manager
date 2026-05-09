import React from "react";

const AvatarGroup = (data) => {
  return (
    <div className=' mb-2 mt-2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold'>
      {data?.avatar ? (
        <img
          src={data.avatar}
          className='w-full h-full object-cover rounded-full'
        />
      ) : (
        <span>{data?.fullName?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export default AvatarGroup;
