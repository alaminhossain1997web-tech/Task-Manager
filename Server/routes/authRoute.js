const express = require("express");
const { registration, login, verifyOTP, userprofile, UpdateProfile } = require("../controller/authController");
const { authMiddleWare } = require("../middleware/authMiddleWare");

const router = express.Router()
const multer = require("multer");
const upload = multer()
 router.post("/registration", registration)
 router.post("/verify-otp", verifyOTP)
 router.post("/login", login)
 router.get("/profile",authMiddleWare, userprofile)
 router.put( "/update-profile",authMiddleWare,upload.single('avatar'), UpdateProfile)
module.exports = router;