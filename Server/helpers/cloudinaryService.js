const cloudinary = require("../configs/cloudinary");

const uploadCloudinary = async ({ mimetype, imgbuffer }) => {
  const dataUrl = `data:${mimetype};base64,${imgbuffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUrl);
  return result; 
};
const distroyFromCloudinary = (url) =>{
    const publicId = url.split("/").pop().split(".").shift()
    
     cloudinary.uploader.destroy(publicId,(error, result) =>{ 
    if(error){
        console.log("distroy from cloudinary",error);
    }
    })
}

module.exports = { uploadCloudinary, distroyFromCloudinary };