const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");
const authSchema = require("../models/authSchema");
// create project
const createProject = async (req, res) => {
  const { Title, discription } = req.body;

  try {
    const slug = generateSlug(Title)
    const project = new projectSchema({
      Title,
      discription,
      slug,
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
};//project list
const projectList = async (req,res)=>{
  try {
    const {search} = req.query
    const projects = await projectSchema.find({
      author: req.user._id, Title: { $regex: search, $options: 'i'} //regex use for search project (shortcut)
    }).populate("author","fullName avatar"); //populate use for author's name and avatar findout from authschema
    if (!projects){
      return res.status(400).send({message:"Project not found"})
    }
    res.status(200).send({projects})
  } catch (error) {
    res.status(500).send({
      message: "Project list error"
    });
  }
}
//add members 
const addMember = async (req,res)=>{
  const {email, projectId}= req.body;
  try {
    const existEmail = await authSchema.findOne({email})
    if (!existEmail){
      return res.status(400).send({message:"sorry! email not exist"})
    }
    const exitMember = await projectSchema.findOne({members:existEmail._id});
    if (exitMember){
      return res.status(400).send({message:"member already exist"})
    }
    const project = await authSchema.findOneAndUpdate({_id: projectId},{members: existEmail._id},{new:true})
    if (!project){
      return res.status(400).send({message:"Invalid Request"})
    }
    console.log(project);
    
  } catch (error) {
    console.log(error);
    
    res.status(500).send({
      message: "addmember's error"
    });
  }
}

module.exports = { createProject ,projectList, addMember};
