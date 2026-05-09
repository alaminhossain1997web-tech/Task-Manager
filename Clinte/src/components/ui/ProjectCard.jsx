import React from "react";
import AvatarGroup from "./AvatarGroup";

const ProjectCard = ({project}) => {
  return (
    <div className="container">
      <div
        className="group w-72 bg-white/70 backdrop-blur-md border border-blue-700
        shadow-lg rounded-2xl p-6 space-y-4 relative overflow-hidden
        transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      >
        {/* Gradient Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition"></div>

        {/* Top Badge */}
        <div
          className="w-20 h-20 bg-blue-700 rounded-full absolute -right-6 -top-6
          flex items-end justify-start p-4 shadow-md"
        >
          <span className="text-white text-lg font-semibold">
            {project.number}
          </span>
        </div>

        {/* Icon */}
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-700 text-white group-hover:scale-110 transition">
          {project.icon}
        </div>

        {/* Title */}
        <h1 className="font-semibold text-lg text-gray-800 group-hover:text-violet-600 transition">
          {project.title}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed">
          {project.description}
        </p>

        <AvatarGroup members={project?.members}/>



        {/* Bottom Line */}
        <div className="h-[2px] w-0 bg-violet-500 group-hover:w-full transition-all duration-300"></div>
      </div>
    </div>
  );
};

export default ProjectCard;