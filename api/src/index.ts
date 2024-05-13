import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import jwt from "jsonwebtoken";
// import { Task } from "./models/Task";
import { User } from "./types/types";
import loginRoute from "./routes/loginRoute";
import signupRoute from "./routes/signupRoute";
import tasksRoutes from "./routes/tasksRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

interface CustomRequest extends Request {
  user: User;
}

// Connection to MongoDB
const mongooseOptions: ConnectOptions = {
  // @ts-ignore
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect("mongodb://localhost:27017/task_manager", mongooseOptions)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Authentication middleware
function authenticateToken(req: CustomRequest, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes
app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/tasks", tasksRoutes);

// @ts-ignore
// app.get("/tasks", authenticateToken, async (req: CustomRequest, res) => {
//   const tasks = await Task.find({ userId: req.user.username });
//   res.json(tasks);
// });

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
