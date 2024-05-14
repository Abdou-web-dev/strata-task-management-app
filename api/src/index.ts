import express, { NextFunction, RequestHandler } from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import jwt from "jsonwebtoken";
// import { Task } from "./models/Task";
import { User } from "./types/types";
import loginRoute from "./routes/loginRoute";
import signupRoute from "./routes/signupRoute";
import tasksRoutes from "./routes/tasksRoutes";
// const morgan = require("morgan");
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Log requests in 'dev' format

interface CustomRequest extends Request {
  user: User;
}

mongoose.connect("mongodb://127.0.0.1:27017/task_manager", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as Parameters<typeof mongoose.connect>[1]);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Authentication middleware
// @ts-ignore
const authenticateToken: RequestHandler = (req: CustomRequest, res: Response, next: NextFunction) => {
  // @ts-ignore
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // @ts-ignore
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: jwt.VerifyErrors | null, user: any) => {
    // @ts-ignore
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
};

// Routes
app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/tasks", tasksRoutes);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { authenticateToken };
