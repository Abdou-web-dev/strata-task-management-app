import express from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User"; // Adjust the path to your User model
import bcrypt from "bcrypt";

const router = express.Router();

// login route handler
router.post("/", async (req, res) => {
  const { username, password } = req.body;

  // Ensure ACCESS_TOKEN_SECRET is defined
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    return res.status(500).json({ message: "Token secret not defined" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ _id: user._id }, accessTokenSecret, { expiresIn: "1h" });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
