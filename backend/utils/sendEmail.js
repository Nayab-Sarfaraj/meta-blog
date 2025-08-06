const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = async (email, userId) => {
  try {


    const transporter = nodemailer.createTransport({
      host: "gmail",
      port: 2525,
      auth: {
        user: process.env.send_Email_User,
        pass: process.env.send_Email_Password,
      },
    });

    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    // console.log(token);
    // console.log(email);
    const mailOptions = {
      from: "nayabsarfaraj@gmail.com",
      to: email,
      subject: "Reset your password",

      html: `<p><Copy And Paste the lnk below in your browser . <br />
        http://localhost:3000/reset-password?token=${token}
        </p>`,
    };
    const info = await transporter.sendMail(mailOptions);

    // console.log("Message sent: ", info.messageId);
    return info;
  } catch (error) {
    console.log("error while sending the email");
    console.log(error);
  }
};

module.exports = sendMail;
