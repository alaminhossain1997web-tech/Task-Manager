require("dotenv").config();
const cloudinary = require("cloudinary").v2;

// Load credentials before any upload attempt so Cloudinary does not fail with
// vague runtime errors like "Must supply api_key".
const { my_cloud_name, my_key, my_secret } = process.env;


cloudinary.config({
  cloud_name: my_cloud_name,
  api_key: my_key,
  api_secret: my_secret
});

module.exports = cloudinary;
