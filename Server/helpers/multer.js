const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname,"../uploads");
  console.log(uploadPath);
  cb(null, uploadPath);
    //cb(null,path.join(__dirname,"../uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
module.exports = upload