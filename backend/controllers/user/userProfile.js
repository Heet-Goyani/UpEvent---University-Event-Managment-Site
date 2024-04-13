// Controller imports

// Middleware imports

// Model imports
import User from "../../db/models/users.js";

const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const { name, college, instagram, linkedin, facebook, twitter } = req.body;
    const user = await User.findOne({
      where: { id },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const updatedUser = await User.update(
      {
        name,
        college,
        instagram,
        linkedin,
        facebook,
        twitter,
      },
      {
        where: { id },
      }
    );
    if (!updatedUser)
      return res.status(400).json({ message: "Profile not updated" });
    return res.status(200).json({ message: "Profile updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({
      where: { id },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    const deletedUser = await User.destroy({
      where: { id },
    });
    if (!deletedUser)
      return res.status(400).json({ message: "Profile not deleted" });
    return res.status(200).json({ message: "Profile deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getProfile, updateProfile, deleteProfile };
