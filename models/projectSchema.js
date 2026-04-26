const mongoose = require("mongoose"); 

const taskSchema = new mongoose.Schema({
    Title:{
        type: String,
        required: true,
        trim: true
    },
    discription:{
        type: String,
        required: true,
        trim: true
    },
    priority:{
        type : String,
        default: "mideum",
        enum : ["high","mideum","Normal"]
    },
    assignedTo:{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    isComplete:{
        type: Boolean,
        default: false
    }
})
const projectSchema = new mongoose.Schema({
   Title:{
        type: String,
        required: true,
        trim: true
    },
    discription:{
        type: String,
        required: true,
        trim: true
    },
    author:{
        type: mongoose.Types.ObjectId,
        ref: "user",
        required: true
    },
    slug:{
        type: String,
        required: true,
        unique:true
    },
    members:[{
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
   ],
    task:[taskSchema],

})

module.exports = mongoose.model("project", projectSchema)
