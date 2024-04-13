// Controller imports

// Middleware imports

// Model imports
import Organiser from "../../db/models/organisers.js";

const getOrganiserDetails = async (req, res) => {
  try {
    const organiser = await Organiser.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password"] },
    });
    if (!organiser)
      return res.status(404).json({ message: "Organiser not found" });
    return res.status(200).json({ organiser: organiser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const getOrganiserList = async (req, res) => {
  try {
    const organisers = await Organiser.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!organisers)
      return res.status(404).json({ message: "No organisers found" });
    return res.status(200).json({ organisers: organisers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export { getOrganiserDetails, getOrganiserList };
