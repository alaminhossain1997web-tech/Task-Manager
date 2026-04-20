const { mailsender } = require("../helpers/mailService");
const { isvalidEmail, isvalidPassword, generateOTP } = require("../helpers/utils");
const authSchema = require("../models/authSchema");

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
        res.status(200).send({message:"Login successful!"})

        const accessToken = generateAccessToken({_id: user._id, email: user.email});
        res.status(200).send({message:"Login successful!", accessToken})

        res.cookie("accessToken",accessToken)
        console.log(accessToken)
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
};
const userprofile = async (req,res) => {
       try{
        const userData = await authSchema.findOne({userId: req.user._id}).select("avatar fullName email")
        if(!userData) {
            return res.status(404).send({message:"User not found"})
        }
        res.status(200).send(userData)
       }catch (error) {
       
    }
};
const UpdateProfile = async (req,res) => {
const {fullName,} = req.body;
const userId = req.user._id;
try {
 console.log(req.file) 
res.send("update profile route")
}catch (error) {

}
}

module.exports = {registration, verifyOTP, login, userprofile, UpdateProfile}
