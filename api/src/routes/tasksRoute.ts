import express, { RequestHandler } from "express";
import * as taskController from "../controllers/taskController";
import { authenticateToken } from "../index";

const router = express.Router();

// this is a method to get all tasks from the database
// @ts-ignore
router.get("/", taskController.getAllTasks);
router.post("/", taskController.createTask);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

// Read tasks for the authenticated user
// router.get("/", authenticateToken as RequestHandler, taskController.getAllTasks);

// // Read tasks filtered by status for the authenticated user
// router.get("/status/:status", authenticateToken as RequestHandler, taskController.getTasksByStatus);

// // Update a task
// router.put("/:taskId", authenticateToken as RequestHandler, taskController.updateTask);

// // Delete a task
// router.delete("/:taskId", authenticateToken as RequestHandler, taskController.deleteTask);

export default router;
