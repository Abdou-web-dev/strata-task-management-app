import express, { RequestHandler } from "express";
import * as taskController from "../controllers/taskController";
import checkAuthToken from "../middlewares/authenticate";

const router = express.Router();

// The checkAuthToken function is a middleware function that handles the authentication of incoming requests using JWT (JSON Web Token).
// @ts-ignore
// this is a method to get all tasks from the database
router.get("/", checkAuthToken as RequestHandler, taskController.getAllTasks);

// @ts-ignore
router.get("/:taskId", checkAuthToken as RequestHandler, taskController.getTaskById);

// @ts-ignore
router.post("/", checkAuthToken as RequestHandler, taskController.createTask);

// @ts-ignore
router.put("/:taskId", checkAuthToken as RequestHandler, taskController.updateTask);
// @ts-ignore
router.delete("/:taskId", checkAuthToken as RequestHandler, taskController.deleteTask);

// // Read tasks filtered by status for the authenticated user
// router.get("/status/:status", checkAuthToken as RequestHandler, taskController.getTasksByStatus);

export default router;
