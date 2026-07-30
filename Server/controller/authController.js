const { mailsender } = require("../helpers/mailService");
const {
  isvalidEmail,
  isvalidPassword,
  generateOTP,
  generateAccessToken,
} = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const {
  uploadCloudinary,
  distroyFromCloudinary,
} = require("../helpers/cloudinaryService");

const authCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};

// Registration
const registration = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    if (!fullName?.trim()) {
      return res.status(400).send({ message: "Fullname is required", field: "fullName" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required", field: "email" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required", field: "password" });
    }
    if (!isvalidEmail(email)) {
      return res.status(400).send({ message: "Invalid Email", field: "email" });
    }
    if (!isvalidPassword(password)) {
      return res.status(400).send({ message: "Invalid Password", field: "password" });
    }

    const existingEmail = await authSchema.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ message: "This Email already exist", field: "email" });
    }

    const OTP_number = generateOTP();
    const user = new authSchema({
      fullName,
      email,
      password,
      otp: OTP_number,
      otpExpiry: Date.now() + 4 * 60 * 1000,
    });

    await user.save();
    await mailsender({
      email,
      otp: OTP_number,
      subject: "OTP verification email",
    });

    return res.status(200).send({ message: "registration Successfull!" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// OTP verification
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await authSchema.findOneAndUpdate(
      { email, otp, otpExpiry: { $gt: Date.now() } },
      { isVerified: true, otp: null, otpExpiry: null },
      { returnDocument: "after" },
    );

    if (!user) {
      return res.status(400).send({ message: "Invalid Request" });
    }

    return res.status(200).send({ message: "Email verification successful" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authSchema.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid Email", field: "email" });
    }
    if (!user.isVerified) {
      return res.status(400).send({
        message: "Please verify your email before login",
        field: "email",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid Password", field: "password" });
    }

    const accessToken = generateAccessToken({ _id: user._id, email: user.email });

    return res
      .status(200)
      .cookie("accessToken", accessToken, authCookieOptions)
      .send({ message: "Login successful!" });
  } catch (error) {
  console.error(error);

  return res.status(500).send({
    message: "Internal Server Error",
    error: error.message
  });
}
};

// Logout
const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .clearCookie("accessToken", authCookieOptions)
      .send({ message: "Logout successful!" });
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// User profile
const userprofile = async (req, res) => {
  try {
    const userData = await authSchema
      .findOne({ _id: req.user._id })
      .select("avatar fullName email");

    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    return res.status(200).send(userData);
  } catch (error) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

// User name and avatar update
const UpdateProfile = async (req, res) => {
  const { fullName } = req.body;
  const userId = req.user._id;

  try {
    if (fullName !== undefined && typeof fullName !== "string") {
      return res.status(400).send({ message: "Invalid full name", field: "fullName" });
    }

    const userData = await authSchema.findOne({ _id: userId });
    if (!userData) {
      return res.status(404).send({ message: "User not found" });
    }

    if (fullName?.trim()) {
      userData.fullName = fullName.trim();
    }

    if (req.file) {
      const avatarUpload = await uploadCloudinary({
        mimetype: req.file.mimetype,
        imgbuffer: req.file.buffer,
      });

      if (userData.avatar) {
        distroyFromCloudinary(userData.avatar);
      }

      userData.avatar = avatarUpload.secure_url;
    }

    await userData.save();

    return res.status(200).send({ message: "Profile update successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Profile update failed" });
  }
};

module.exports = {
  registration,
  verifyOTP,
  login,
  logout,
  userprofile,
  UpdateProfile,
};
