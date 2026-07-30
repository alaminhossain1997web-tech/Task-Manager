const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");
const authSchema = require("../models/authSchema");

// Create project
const createProject = async (req, res) => {
  const { Title, description } = req.body;

  try {
    if (!Title?.trim()) {
      return res.status(400).send({ message: "Title is required", field: "Title" });
    }
    if (!description?.trim()) {
      return res.status(400).send({
        message: "Description is required",
        field: "description",
      });
    }

    const slug = generateSlug(Title);
    const project = new projectSchema({
      Title,
      discription: description,
      slug,
      author: req.user._id,
    });

    await project.save();

    return res.status(200).send({
      message: "project created successfully!",
    });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(400).send({ message: "A project with this title already exists" });
    }

    console.error(error);
    return res.status(500).send({
      message: "Project creation failed",
    });
  }
};

// Project list
const projectList = async (req, res) => {
  try {
    const { search } = req.query;
    const projects = await projectSchema
      .find({
        $or: [{ author: req.user._id }, { members: req.user._id }],
        Title: { $regex: search || "", $options: "i" },
      })
      .populate("author members", "fullName avatar");

    return res.status(200).send({ projects });
  } catch (error) {
    return res.status(500).send({
      message: "Project list error",
    });
  }
};

// Add member
const addMember = async (req, res) => {
  const { email, projectId } = req.body;

  try {
    if (!email || !projectId) {
      return res.status(400).send({ message: "Email and project ID are required" });
    }

    const existingUser = await authSchema.findOne({ email });
    if (!existingUser) {
      return res.status(400).send({ message: "sorry! email not exist" });
    }

    const existingMember = await projectSchema.findOne({
      _id: projectId,
      $or: [{ author: existingUser._id }, { members: existingUser._id }],
    });

    if (existingMember) {
      return res.status(400).send({ message: "member already exist" });
    }

    const project = await projectSchema.findOneAndUpdate(
      { _id: projectId },
      { $addToSet: { members: existingUser._id } },
      { new: true },
    );

    if (!project) {
      return res.status(400).send({ message: "Invalid Request" });
    }

    return res.status(200).send({ message: "Team member added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "addmember's error",
    });
  }
};

// Add task
const addTask = async (req, res) => {
  const { Title, discription, priority, assignedTo, projectId } = req.body;

  try {
    if (!Title?.trim()) {
      return res.status(400).send({ message: "Title is required!" });
    }
    if (!discription?.trim()) {
      return res.status(400).send({ message: "Project discription is required!" });
    }
    if (!priority) {
      return res.status(400).send({ message: "Project priority is required!" });
    }
    if (!["high", "mideum", "Normal"].includes(priority)) {
      return res.status(400).send({ message: "Invalid priority value!" });
    }
    if (!projectId) {
      return res.status(400).send({ message: "Project not found!" });
    }
    if (assignedTo && !Array.isArray(assignedTo)) {
      return res.status(400).send({ message: "Invalid assigned data" });
    }

    const project = await projectSchema.findById(projectId);
    if (!project) {
      return res.status(400).send({ message: "Sorry. Project not found" });
    }

    const projectMemberIds = [project.author, ...project.members].map(String);
    for (const userId of assignedTo || []) {
      if (!projectMemberIds.includes(String(userId))) {
        return res.status(400).send({ message: "Invalid user" });
      }
    }

    await projectSchema.findByIdAndUpdate(
      projectId,
      {
        $push: {
          task: {
            Title,
            discription,
            priority,
            assignedTo: assignedTo || [],
          },
        },
      },
      { new: true, runValidators: true },
    );

    return res.status(200).send({ message: "Task added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Task creation failed" });
  }
};

module.exports = { createProject, projectList, addMember, addTask };
