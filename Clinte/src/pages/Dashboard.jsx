import React from "react";
import Navbar from "../components/ui/Navbar";
//import TaskCard from "../components/ui/TaskCard";
import { RiComputerFill } from "react-icons/ri";
import CreateButton from "../components/ui/CreateButton";
import { useGetProfileQuery, useGetProjectListQuery } from "../Services/api";
import Loader from "../components/ui/Loader";
import { Navigate } from "react-router";
import ProjectCard from "../components/ui/ProjectCard";

const Dashboard = () => {
  const { data, isLoading } = useGetProfileQuery();
  const { data: projectList, isLoading: projectLoading } =
    useGetProjectListQuery();
  if (isLoading) return <Loader />;
  if (!data) {
    return <Navigate to='/login' />;
  }
  console.log(projectList);

  return (
    <div>
      <Navbar />
      
      <div className='container mx-auto'>
        <CreateButton className='my-10 fixed' />
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projectList?.projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
