import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "react-toastify";
import {
  useAddProjectMemberMutation,
  useAddProjectTaskMutation,
  useGetProjectListQuery,
} from "../Services/api";
import Navbar from "../components/ui/Navbar";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Loader from "../components/ui/Loader";
import TaskCard from "../components/ui/TaskCard";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const {
    data: projectList,
    isLoading,
    isError,
    error,
  } = useGetProjectListQuery();
  const [addProjectMember, { isLoading: isAddingMember }] =
    useAddProjectMemberMutation();
  const [addProjectTask, { isLoading: isAddingTask }] =
    useAddProjectTaskMutation();

  const [memberEmail, setMemberEmail] = useState("");
  const [taskForm, setTaskForm] = useState({
    Title: "",
    discription: "",
    priority: "mideum",
    assignedTo: [],
  });

  const project = useMemo(
    () => projectList?.projects.find((item) => item._id === projectId),
    [projectId, projectList],
  );

  const participants = useMemo(() => {
    if (!project) {
      return [];
    }

    const users = [project.author, ...(project.members || [])].filter(Boolean);
    return [...new Map(users.map((user) => [user._id, user])).values()];
  }, [project]);

  const handleAddMember = async (event) => {
    event.preventDefault();

    if (!memberEmail.trim()) {
      toast.error("Member email is required.");
      return;
    }

    try {
      await addProjectMember({
        email: memberEmail.trim(),
        projectId,
      }).unwrap();

      setMemberEmail("");
      toast.success("Team member added successfully.");
    } catch (requestError) {
      toast.error(requestError?.data?.message || "Unable to add team member.");
    }
  };

  const handleTaskChange = (event) => {
    const { name, value } = event.target;

    setTaskForm((currentTask) => ({
      ...currentTask,
      [name]: value,
    }));
  };

  const handleAssigneeChange = (userId) => {
    setTaskForm((currentTask) => ({
      ...currentTask,
      assignedTo: currentTask.assignedTo.includes(userId)
        ? currentTask.assignedTo.filter((id) => id !== userId)
        : [...currentTask.assignedTo, userId],
    }));
  };

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!taskForm.Title.trim() || !taskForm.discription.trim()) {
      toast.error("Task title and description are required.");
      return;
    }

    try {
      await addProjectTask({
        ...taskForm,
        Title: taskForm.Title.trim(),
        discription: taskForm.discription.trim(),
        projectId,
      }).unwrap();

      setTaskForm({
        Title: "",
        discription: "",
        priority: "mideum",
        assignedTo: [],
      });
      toast.success("Task added successfully.");
    } catch (requestError) {
      toast.error(requestError?.data?.message || "Unable to add task.");
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error?.data?.message || "Unable to load the project. Please try again."}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">Project not found.</p>
        <Link to="/" className="text-blue-700 underline">
          Back to projects
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="container mx-auto pb-10">
        <Link to="/" className="inline-block mb-6 text-blue-700 hover:underline">
          ← Back to projects
        </Link>

        <section className="bg-white/70 backdrop-blur-md border border-blue-700 rounded-2xl p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">{project.Title}</h1>
          <p className="mt-2 text-gray-600">{project.discription}</p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          <section className="bg-white/70 backdrop-blur-md border border-blue-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add team member</h2>

            <form onSubmit={handleAddMember} className="space-y-4">
              <Input
                label="Member email"
                name="memberEmail"
                type="email"
                value={memberEmail}
                onChange={(event) => setMemberEmail(event.target.value)}
                placeholder="Enter a registered user's email"
                disabled={isAddingMember}
              />

              <Button type="submit" disabled={isAddingMember}>
                {isAddingMember ? "Adding..." : "Add member"}
              </Button>
            </form>
          </section>

          <section className="bg-white/70 backdrop-blur-md border border-blue-700 rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Add task</h2>

            <form onSubmit={handleAddTask} className="space-y-4">
              <Input
                label="Task title"
                name="Title"
                value={taskForm.Title}
                onChange={handleTaskChange}
                placeholder="Enter task title"
                disabled={isAddingTask}
              />

              <Input
                label="Task description"
                name="discription"
                value={taskForm.discription}
                onChange={handleTaskChange}
                placeholder="Enter task description"
                disabled={isAddingTask}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={taskForm.priority}
                  onChange={handleTaskChange}
                  disabled={isAddingTask}
                  className="w-full px-3 py-2 border border-blue-700 rounded-md text-sm outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
                >
                  <option value="high">High</option>
                  <option value="mideum">Medium</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>

              <fieldset>
                <legend className="text-sm font-medium text-gray-700 mb-2">
                  Assign to
                </legend>

                <div className="flex flex-wrap gap-3">
                  {participants.map((user) => (
                    <label key={user._id} className="flex items-center gap-2 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={taskForm.assignedTo.includes(user._id)}
                        onChange={() => handleAssigneeChange(user._id)}
                        disabled={isAddingTask}
                      />
                      {user.fullName}
                    </label>
                  ))}
                </div>
              </fieldset>

              <Button type="submit" disabled={isAddingTask}>
                {isAddingTask ? "Adding..." : "Add task"}
              </Button>
            </form>
          </section>
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tasks</h2>

          {project.task?.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.task.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  assignees={participants}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No tasks have been added yet.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default ProjectDetails;
