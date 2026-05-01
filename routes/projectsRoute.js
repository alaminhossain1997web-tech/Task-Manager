const express = require("express");
const { createProject, projectList, addMember, addTask } = require("../controller/projectController");
const router = express.Router();

router.post("/create",createProject);
router.get("/list",projectList);
router.post("/add",addMember);
router.post("/addtask",addTask)

module.exports = router;