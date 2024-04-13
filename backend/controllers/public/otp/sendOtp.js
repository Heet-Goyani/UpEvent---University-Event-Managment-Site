import nodemailer from "nodemailer";
import UserOtp from "../../../db/models/otp/userOtp.js";
import OrganiserOtp from "../../../db/models/otp/organiserOtp.js";
import User from "../../../db/models/users.js";
import Organiser from "../../../db/models/organisers.js";

export const sendOtpToUser = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      return res.status(400).json({ message: "User not found" });
    }
    const user = await UserOtp.findOne({where : { userId: findUser.id }});
    if (user) {
      await UserOtp.destroy({where : { userId: findUser.id }});
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_CLIENT_EMAIL,
        pass: process.env.MAIL_CLIENT_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for email verification",
      text: `Your OTP is ${otp}. It will expire in 60 minutes.`,
    };
    let sentMail = await transporter.sendMail(mailOptions);
    if (sentMail) {
      await UserOtp.create({
        userId: findUser.id,
        otp,
        expiry: Date.now() + 3600000,
      });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const sendOtpToOrganiser = async (req, res) => {
  try {
    const { email } = req.body;
    const findOrganiser = await Organiser.findOne({ where: { email } });
    if (!findOrganiser) {
      return res.status(400).json({ message: "No such Organiser not found" });
    }
    const organiser = await OrganiserOtp.findOne({
      where: { userId: findOrganiser.id },
    });
    if (organiser) {
      await OrganiserOtp.destroy({ where: { userId: findOrganiser.id } });
    }
    const otp = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_CLIENT_EMAIL,
        pass: process.env.MAIL_CLIENT_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for email verification",
      text: `Your OTP is ${otp}. It will expire in 60 minutes.`,
    };
    let sentMail = await transporter.sendMail(mailOptions);
    if (sentMail) {
      await OrganiserOtp.create({ email, otp });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
