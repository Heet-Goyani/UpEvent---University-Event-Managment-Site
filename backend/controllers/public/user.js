// Controller imports

// Middleware imports

// Model imports
import User from "../../db/models/users.js";

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getUserList = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    if (!users) return res.status(404).json({ message: "No users found" });
    return res.status(200).json({ users: users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getUserDetails, getUserList };
