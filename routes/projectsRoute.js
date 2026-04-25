const express = require("express");
const { createProject } = require("../controller/projectController");
const router = express.Router();

router.post("/create",createProject)

module.exports = router;