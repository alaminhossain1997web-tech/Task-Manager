const express = require("express");
const { registration, login, verifyOTP, userprofile } = require("../controller/authController");
const { authMiddleWare } = require("../middleware/authMiddleWare");
const router = express.Router()

 router.post("/registration", registration)
 router.post("/verify-otp", verifyOTP)
 router.post("/login", login)
 router.get("/profile",authMiddleWare, userprofile)
module.exports = router;