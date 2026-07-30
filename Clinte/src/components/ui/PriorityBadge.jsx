import React from "react";

const PriorityBadge = ({ priority }) => {
  const priorityColor = {
    high: "bg-red-500",
    mideum: "bg-yellow-500",
    Normal: "bg-green-500",
  };

  return (
    <div
      className={`px-3 py-1 text-xs text-white rounded-full ${
        priorityColor[priority] || "bg-gray-400"
      }`}
    >
      {priority}
    </div>
  );
};

export default PriorityBadge;
