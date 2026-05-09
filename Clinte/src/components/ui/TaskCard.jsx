import React from "react";
import PriorityBadge from "./PriorityBadge";
import { Link } from "react-router";

const TaskCard = ({ project }) => {
  const { Title, discription, priority, assignedTo, isComplete } = task;

  return (
    <Link to="/_id" className="container">
      <div
        className="group w-80 bg-white/80 backdrop-blur-md border border-gray-200
        shadow-md rounded-2xl p-6 space-y-4 relative overflow-hidden
        transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
      >
        {/* Priority Badge */}
        <div className="absolute flex gap-1 top-6 right-4">
          <p className="text-md">Priority :</p>
          <PriorityBadge priority={priority} />
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold text-gray-800">
          {Title}
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500">
          {discription}
        </p>

        {/* Assigned To */}
        <div className="text-sm text-gray-600">
          <span className="font-medium">Assigned To:</span>{" "}
          {assignedTo ? assignedTo : "Unassigned"}
        </div>

        {/* Status */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm">Status:</span>

          <span
            className={`text-xs px-2 py-1 rounded-full text-white ${
              isComplete ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {isComplete ? "Completed" : "Pending"}
          </span>
        </div>

        {/* Bottom line animation */}
        <div className="h-[2px] w-0 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
      </div>
    </Link>
  );
};

export default TaskCard;