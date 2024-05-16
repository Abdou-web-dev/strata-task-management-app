import express from "express";
import { User } from "../models/User"; // Adjust the path to your User model
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, password } = req.body; // allows for both username and email to be received from the client.

  // Ensure ACCESS_TOKEN_SECRET is defined
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  if (!accessTokenSecret) {
    return res.status(500).json({ message: "Token secret not defined" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This user does not exist" });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const payload = { _id: user._id, timestamp: Date.now() };
    const options = { expiresIn: "1h" };
    const secretOrPrivateKey = process.env.ACCESS_TOKEN_SECRET!;
    // the "!" is to assure TypeScript compiler that process.env.ACCESS_TOKEN_SECRET will definitely have a value when the code runs.

    // Generate token
    const token = jwt.sign(payload, secretOrPrivateKey, options);
    // const token = jwt.sign({ _id: user._id, timestamp: Date.now() }, accessTokenSecret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Server error", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
