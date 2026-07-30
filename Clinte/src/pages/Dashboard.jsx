import React, { useState } from "react";
import { Navigate } from "react-router";
import { toast } from "react-toastify";
import Navbar from "../components/ui/Navbar";
import CreateButton from "../components/ui/CreateButton";
import ProjectCard from "../components/ui/ProjectCard";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import {
  useCreateProjectMutation,
  useGetProfileQuery,
  useGetProjectListQuery,
} from "../Services/api";

const Dashboard = () => {
  const {
    data: profile,
    isLoading: isProfileLoading,
    isError: isProfileError,
    error: profileError,
  } = useGetProfileQuery();
  const {
    data: projectList,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useGetProjectListQuery();
  const [createProject, { isLoading: isCreatingProject }] =
    useCreateProjectMutation();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [projectForm, setProjectForm] = useState({
    Title: "",
    description: "",
  });
  const [projectErrors, setProjectErrors] = useState({});

  const handleProjectChange = (event) => {
    const { name, value } = event.target;

    setProjectForm((currentProject) => ({
      ...currentProject,
      [name]: value,
    }));

    setProjectErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  };

  const closeCreateProject = () => {
    if (isCreatingProject) {
      return;
    }

    setIsCreateOpen(false);
    setProjectErrors({});
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();

    const errors = {};
    if (!projectForm.Title.trim()) {
      errors.Title = "Project title is required";
    }
    if (!projectForm.description.trim()) {
      errors.description = "Project description is required";
    }

    if (Object.keys(errors).length) {
      setProjectErrors(errors);
      return;
    }

    try {
      await createProject({
        Title: projectForm.Title.trim(),
        description: projectForm.description.trim(),
      }).unwrap();

      setProjectForm({
        Title: "",
        description: "",
      });
      setIsCreateOpen(false);
      toast.success("Project created successfully.");
    } catch (requestError) {
      const field = requestError?.data?.field;
      const message =
        requestError?.data?.message || "Unable to create the project.";

      if (field) {
        setProjectErrors({ [field]: message });
        return;
      }

      toast.error(message);
    }
  };

  if (isProfileLoading) {
    return <Loader />;
  }

  if (isProfileError && profileError?.status === 401) {
    return <Navigate to="/login" replace />;
  }

  if (isProfileError || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {profileError?.data?.message || "Unable to load your profile. Please try again."}
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="container mx-auto">
        <CreateButton
          className="my-10 fixed"
          onClick={() => setIsCreateOpen(true)}
        />

        {isProjectLoading && <Loader />}

        {isProjectError && (
          <p className="text-red-600">
            {projectError?.data?.message || "Unable to load projects. Please try again."}
          </p>
        )}

        {!isProjectLoading && !isProjectError && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectList?.projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <form
            onSubmit={handleCreateProject}
            className="w-full max-w-md rounded-2xl border border-blue-700 bg-white p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-gray-800">Create project</h2>
              <button
                type="button"
                onClick={closeCreateProject}
                disabled={isCreatingProject}
                className="text-xl text-gray-500 hover:text-black disabled:cursor-not-allowed"
                aria-label="Close create project form"
              >
                ×
              </button>
            </div>

            <Input
              label="Project title"
              name="Title"
              value={projectForm.Title}
              onChange={handleProjectChange}
              placeholder="Enter project title"
              error={projectErrors.Title}
              disabled={isCreatingProject}
            />

            <Input
              label="Project description"
              name="description"
              value={projectForm.description}
              onChange={handleProjectChange}
              placeholder="Enter project description"
              error={projectErrors.description}
              disabled={isCreatingProject}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={closeCreateProject}
                disabled={isCreatingProject}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isCreatingProject}>
                {isCreatingProject ? "Creating..." : "Create project"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
