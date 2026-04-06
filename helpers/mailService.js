const nodemailer = require("nodemailer");

// create transporteer , for send a mail,


const transporter = nodemailer.createTransport({
  host: "smtp.example.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
 
// mailsender 
const mailsender = async ({email,subject,otp}) => {
    await transporter.sendMail({
    from: '"Taskmanagar Team" <exampleMail71@gmail.com>', // sender address
    to: email, // list of recipients
    subject: subject, // subject line
    html: `<b>please verify your email</b>
           <b>OTP:${otp}</b>`
  });
}
  module.exports = {mailsender}