const { generateSlug } = require("../helpers/utils");
const projectSchema = require("../models/projectSchema");
const authSchema = require("../models/authSchema");



// create projects
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
};


//project list
const projectList = async (req,res)=>{
  try {
    const {search} = req.query
    const projects = await projectSchema.find({
      $or: [{
      author: req.user._id, //author can see the projectlist
      },
      {members: req.user._id,// members also can see the projectlist
        }],
      Title: { $regex: search || "", $options: 'i'} //regex use for search project (shortcut)
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
    const exitMember = await projectSchema.findOne({
      _id: projectId,
      $or: [
      {author: existEmail._id},
      {members: existEmail._id}],
    });
    if (exitMember){
      return res.status(400).send({message:"member already exist"})
    }
    const project = await projectSchema.findOneAndUpdate({_id: projectId},{members: existEmail._id},{new:true})
    if (!project){
      return res.status(400).send({message:"Invalid Request"})
    }
    res.status(200).send({message:"Team member added successfully"})
    console.log(project);
    
  } catch (error) {
    console.log(error);
    
    res.status(500).send({
      message: "addmember's error"
    });
  }
}

// task add
const addTask = async (req,res)=>{
  try {
const {Title,discription,priority,assignedTo,projectId}= req.body
if (!Title) {
  return status(400).send({message:"Title is required!"})
}
if(!discription){
  return res.status(400).send({message:"Project discription is required!"})
}
if(!priority){
  return res.status(400).send({message:"Project priority is required!"})
}
if (!["high","mideum","Normal"].includes(priority)){
  return res.status(400).send({message:"Invalid priority value!"})
}
if(!projectId){
  return res.status(400).send({message:"Project not found!"})
}
if(assignedTo && !Array.isArray(assignedTo)){
  return res.status(400).send({message: "Invalid assigned data"})
}
if(assignedTo){
  for (const userId of assignedTo) {
   const exitMember = await projectSchema.findOne({
    _id: projectId,
      $or: [
      {author: userId},
      {members: userId}],
    }); 
    if(!exitMember){
      return res.status(400).send({message:"Invalid user"})
    }
  }
}

const projectData = await projectSchema.findOneAndDelete(
  {_id:projectId},
  {task: {Title,discription,priority,assignedTo}},
  {new:true})
  if(!projectData){
    return res.status(400).send({message: "Sorry. Project not found"})
  }
  res.status(200).send({message:"Task added successfully"})
  } catch (error) {
    console.log(error);
    
  }
}

module.exports = { createProject ,projectList, addMember,addTask};
