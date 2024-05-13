import express from "express";
import * as taskController from "../controllers/taskController";

const router = express.Router();

// this is a method to get all tasks from the database
router.get("/", taskController.getAllTasks);

export default router;
