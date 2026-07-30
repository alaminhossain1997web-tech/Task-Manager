import React from "react";

const AvatarGroup = ({ members = [] }) => {
  const member = members[0];

  if (!member) {
    return null;
  }

  return (
    <div className='mb-2 mt-2 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold'>
      {member.avatar ? (
        <img
          src={member.avatar}
          alt={`${member.fullName}'s avatar`}
          className='w-full h-full object-cover rounded-full'
        />
      ) : (
        <span>{member.fullName?.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export default AvatarGroup;
