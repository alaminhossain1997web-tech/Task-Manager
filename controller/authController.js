const { isvalidEmail, isvalidPassword, generateOTP } = require("../helpers/utils");
const authSchema = require("../models/authSchema");

const registration = async (req,res) => {
const {fullName, email, password} =req.body;
    try {
        if (!fullName?.trim()) return res.status(400).send({message:"Fullname is required"})
        if (!email) return res.status(400).send({message:"Email is required"})
        if (!password) return res.status(400).send({message:"Password is required"})
        if (!isvalidEmail) return res.status(400).send({message:"Invalid Email"})
        if (!isvalidPassword) return res.status(400).send({message:"Invalid Password"})
 
            {/*existing email password check*/}
            const existingEmail =await authSchema.findOne(email);
            if (existingEmail) return res.status(400).send({message:"This Email already exist"})
            const OTP_number = generateOTP();
            const user = await authSchema({fullName, email, password, otp: OTP_number, otpExpiry:Date.now() + 4 * 60 * 1000})
            user.save()

            await mailsender({email, otp: OTP_number, subject:"OTP verification mail"})

        res.status(200).send({massege:"registration Successfull!"})        
    } catch (error) {
        res.status(500).send({message: "Internal Server Error"})
    }
};
const login = async (req,res) => {
const {email, password} =req.body;
    try {
        
    } catch (error) {
        
    }
}

module.exports = {registration, login}
