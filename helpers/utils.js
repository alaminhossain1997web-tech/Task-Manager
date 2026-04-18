const crypto = require('crypto');
const jwt = require("jsonwebtoken");//import for token generate

const isvalidEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

const isvalidPassword = (password) => {
  const passwordPattern = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
  return passwordPattern.test(password);
};
 //random encrypted OTP generate inbuild mathod 
const generateOTP = () => {
  return crypto.randomInt(1000, 10000)
};
// access token generate for login user
const generateAccessToken = (user) => {
 const token = jwt.sign(user, process.env.JWT_SECRET_KEY,);
 return token;
}
module.exports = { isvalidEmail, isvalidPassword, generateOTP, generateAccessToken};