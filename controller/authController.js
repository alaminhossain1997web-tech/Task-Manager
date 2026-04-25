const { mailsender } = require("../helpers/mailService");
const { isvalidEmail, isvalidPassword, generateOTP, generateAccessToken } = require("../helpers/utils");
const authSchema = require("../models/authSchema");
const cloudinary = require("../configs/cloudinary");
const { uploadCloudinary, distroyFromCloudinary } = require("../helpers/cloudinaryService");

//Registration
const registration = async (req,res) => {
const {fullName, email, password} =req.body;
    try {
        if (!fullName?.trim()) return res.status(400).send({message:"Fullname is required"})
        if (!email) return res.status(400).send({message:"Email is required"})
        if (!password) return res.status(400).send({message:"Password is required"})
        if (!isvalidEmail(email)) return res.status(400).send({message:"Invalid Email"})
        if (!isvalidPassword(password)) return res.status(400).send({message:"Invalid Password"})
 
            {/*existing email password check*/}
            const existingEmail =await authSchema.findOne({email});
            if (existingEmail) return res.status(400).send({message:"This Email already exist"})
            const OTP_number = generateOTP();
            const user = new authSchema({fullName, email, password, otp: OTP_number, otpExpiry:Date.now() + 4 * 60 * 1000})
            await user.save()

            await mailsender({email, otp: OTP_number, subject:"OTP verification email"})

        res.status(200).send({massege:"registration Successfull!"})        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
};
//OTP Verification
const verifyOTP = async (req,res) => {
    const {email, otp} = req.body;
    try {
        const user = await authSchema.findOneAndUpdate({email, otp, otpExpiry: {$gt: Date.now()}}, {isVerified: true, otp: null, otpExpiry: null}, {returnDocument: "after"});
        if (!user) return res.status(400).send({message:"Invalid Request"})
        res.status(200).send({message:"Email verification successful"})
    } catch (error) {
         res.status(500).send({message: "Internal Server Error"})
    }
};
//Login 
const login = async (req,res) => {
const {email, password} =req.body;
    try {
        const user = await authSchema.findOne({email});
        if (!user) return res.status(400).send({message:"Invalid Email"})
        if (!user.isVerified) return res.status(400).send({message:"Please verify your email before login"})
            const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).send({message:"Invalid Password"})
        const accessToken = generateAccessToken({_id: user._id, email: user.email});
        
        res.status(200).cookie("accessToken",accessToken).send({message:"Login successful!", accessToken})

    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
};
//user profile
const userprofile = async (req,res) => {
       try{
        const userData = await authSchema.findOne({_id: req.user._id}).select("avatar fullName email")
        if(!userData) {
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send(userData)
       }catch (error) {
       
    }
};
//user name and avatar update
const UpdateProfile = async (req,res) => {
const {fullName,} = req.body;
const userId = req.user._id;
try {
    const userData = await authSchema.findOne({_id: userId}) //for quary user  

    if (fullName.trim()) userData.fullName = fullName; // for update name

    if(req.file){ 

    const avatarUrl = await uploadCloudinary({  //uploadCloudinary for update
     mimetype:req.file.mimetype,
     imgbuffer:req.file.buffer})
     distroyFromCloudinary(userData.avatar)   // distroy From Cloudinary for delete from cloudinary 
     userData.avatar = await avatarUrl.secure_url 
    
    }
    userData.save() // delete past image and save  new image

res.status(500).send({ message: "profile update successfully" }); 

}catch (error) {
console.log(error);
 res.status(500).send({ message: "Profile update failed" });
}
}

module.exports = {registration, verifyOTP, login, userprofile, UpdateProfile}
