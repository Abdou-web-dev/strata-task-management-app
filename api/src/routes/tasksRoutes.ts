import express from "express";
import * as taskController from "../controllers/taskController";
import { authenticateToken } from "../index";

const router = express.Router();

// this is a method to get all tasks from the database
// @ts-ignore
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);

// router.get("/", (req, res) => {
//   res.send("Welcome to the Task Management App"); // Send a welcome message or render a homepage
// });

// function mockAuthenticateToken(req, res, next) {
//   // Mock authentication logic to attach a fake user to the request
//   req.user = { id: "123", username: "testuser" };
//   next();
// }

// router.get("/", mockAuthenticateToken, taskController.getAllTasks);

export default router;
