const projectSchema = require("../models/projectSchema");

const createProject = async (req, res) => {
  const { Title, discription } = req.body;

  try {

    const project = new projectSchema({
      Title,
      discription,
      author: req.user._id
    });

    await project.save();

    res.status(200).send({
      message: "project created successfully!"
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Project creation failed"
    });
  }
};

module.exports = { createProject };
