const express = require("express");
const { createProject, projectList, addMember } = require("../controller/projectController");
const router = express.Router();

router.post("/create",createProject);
router.get("/list",projectList);
router.post("/add",addMember)

module.exports = router;