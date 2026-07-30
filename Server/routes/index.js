const express = require("express");
const router = express.Router();
const authRoute = require("./authRoute")
const projectsRoute = require("./projectsRoute");
const { authMiddleWare } = require("../middleware/authMiddleWare");

router.get("/",(req,res) =>{
    res.status(200).send("hello from server")
})

router.use("/auth",authRoute)
router.use("/projects",authMiddleWare, projectsRoute)
 
module.exports = router;
