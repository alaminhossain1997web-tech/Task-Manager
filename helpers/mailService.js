const nodemailer = require("nodemailer");
const { emailTemplets } = require("./emailTemplets");

// create transporteer , for send a mail,


const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "alaminhossain1997.web@gmail.com",
    pass: "reug xmin ezsc inpt",
  },
});
 
// mailsender 
const mailsender = async ({ email, subject, otp, otpExpiry }) => {
  try {
    await transporter.sendMail({
      from: 'Taskmanager Team" <yourgmail@gmail.com>',
      to: email,
      subject: subject,
      html: emailTemplets(otp,otpExpiry)
      ,
    });
  } catch (error) {
    console.log("MAIL ERROR:", error.message);
  }
};
  module.exports = {mailsender}