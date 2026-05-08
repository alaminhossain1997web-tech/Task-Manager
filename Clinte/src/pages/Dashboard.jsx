import React from "react";
import Navbar from "../components/ui/Navbar";
import TaskCard from "../components/ui/TaskCard";
import { RiComputerFill } from "react-icons/ri";
import CreateButton from "../components/ui/CreateButton";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <CreateButton className='my-10 fixed' />
      <TaskCard
        task={{
          Title: "UI / UX Design",
          discription: "User-friendly and modern design system.",
          priority: "high",
          assignedTo: "John Doe",
          isComplete: false,
        }}
      />
    </div>
  );
};

export default Dashboard;
