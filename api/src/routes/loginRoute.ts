import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { User } from "../models/User";

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET!);

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default router;
