import express from "express";
import cors from "cors";
import mongoose, { ConnectOptions } from "mongoose";
import { User } from "./types/types";
import dotenv from "dotenv";
import loginRoute from "./routes/loginRoute";
import signupRoute from "./routes/signupRoute";
import tasksRoute from "./routes/tasksRoute";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Log requests in 'dev' format

const MONGODB_URI: string = process.env.MONGODB_URI as string;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as Parameters<typeof mongoose.connect>[1]);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use("/api/login", loginRoute);
app.use("/api/signup", signupRoute);
app.use("/api/tasks", tasksRoute);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
