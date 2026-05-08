import React from "react";

const CreateButton = ({
  onClick,
  size = "md",
  variant = "solid",
  className = "",
}) => {
  const baseStyles =
    "group flex items-center justify-center rounded-2xl relative overflow-hidden transition-all duration-300 cursor-pointer";

  const sizes = {
    sm: "w-52 h-32",
    md: "w-72 h-44",
    lg: "w-80 h-52",
  };

  const variants = {
    solid:
      "bg-white/70 backdrop-blur-md border border-blue-700 hover:shadow-2xl hover:-translate-y-2",
    dashed:
      "bg-white/60 backdrop-blur-md border-2 border-dashed border-blue-700 hover:border-solid hover:shadow-xl hover:-translate-y-2",
  };

  return (
    <div className="container">
  <div
    onClick={onClick}
    className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className} flex flex-col items-center justify-center gap-2`}
  >
    {/* Create Text */}
    <span className="text-2xl font-medium text-gray-700">
      Create
    </span>

    {/* Gradient Glow */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition"></div>

    {/* Plus Icon */}
    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-700 text-white text-3xl group-hover:scale-110 transition">
      +
    </div>
  </div>
</div>
  );
};

export default CreateButton;