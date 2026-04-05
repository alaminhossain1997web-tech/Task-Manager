const mongoose = require ("mongoose");
const bcrypt= require ("bcrypt");

const authSchema = new mongoose.Schema({
    avater:{
        type: String,
        default: ""
    },
    fullname:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    otp:{
        type: String,
        default: null
    },
    otpExpiry:{
        type: Date
    },

})

authSchema.pre('save', async function () {
  try {
    // Only hash if password is new or changed
    if (!this.isModified('password')) return;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (err) {
    res.status(500).send({message:"Invalied request"})
  }
});

module.exports = mongoose.model("user", authSchema)
