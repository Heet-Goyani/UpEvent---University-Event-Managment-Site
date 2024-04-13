import UserOtp from "../../../db/models/otp/userOtp.js";
import OrganiserOtp from "../../../db/models/otp/organiserOtp.js";

import User from "../../../db/models/users.js";
import Organiser from "../../../db/models/organisers.js";

const verifyUserOtp = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    const findUser = await User.findOne({ where: { email } });
    const user = await UserOtp.findOne({ where: { userId: findUser.id, otp } });
    if (user) {
      let resetPassword = await User.update(
        { password: newPassword },
        { where: { email } }
      );
      await UserOtp.destroy({ where: { userId: findUser.id } });
      if (resetPassword) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      }
    } else {
      await UserOtp.destroy({ where: { userId: findUser.id } });
      return res
        .status(400)
        .json({ message: "Invalid OTP or record not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const verifyOrganiserOtp = async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;
    const findUser = await Organiser.findOne({ where: { email } });
    const organiser = await OrganiserOtp.findOne({
      where: { userId: findUser.id, otp },
    });
    if (organiser) {
      await OrganiserOtp.destroy({ where: { userId: findUser.id } });
      let resetPassword = await Organiser.update(
        { password: newPassword },
        { where: { email } }
      );
      await OrganiserOtp.destroy({ where: { userId: findUser.id } });
      if (resetPassword) {
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
      }
    } else {
      await OrganiserOtp.destroy({ where: { userId: findUser.id } });
      return res
        .status(400)
        .json({ message: "Invalid OTP or record not found." });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { verifyUserOtp, verifyOrganiserOtp };
