import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Controller imports

// Middleware imports

// Model imports
import Organiser from "../../db/models/organisers.js";

// File testing done.

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const old = await Organiser.findOne({
      where: { email },
      raw: true,
    });
    if (!old) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (!bcrypt.compareSync(password, old.password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    } else {
      const token = jwt.sign(
        {
          email: old.email,
          id: old.id,
          role: "organiser",
          verified: old.verified,
        },
        process.env.JWT_SECRET
      );
      delete old.password;
      return res.status(200).json({ token, organiser: old });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name, about } = req.body;
    const old = await Organiser.findOne({
      where: { email },
    });
    if (old) {
      return res.status(409).json({ message: "User already exists" });
    }
    const newUser = await Organiser.create({
      email,
      password,
      name,
      about
    });
    const token = jwt.sign(
      {
        email: newUser.email,
        id: newUser.id,
        role: "organiser",
        verified: newUser.verified,
      },
      process.env.JWT_SECRET
    );
    delete newUser.dataValues.password;
    return res.status(201).json({ token, organiser: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};
