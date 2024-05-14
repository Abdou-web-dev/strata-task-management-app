import { Request, Response } from "express";
import { Task } from "../models/Task";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Fetch tasks from the database
    // res.send("Welcome to the Task Management App"); // Send a welcome message or render a homepage
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller method for creating a new task
const createTask = async (req: Request, res: Response) => {
  try {
    // Extract task data from the request body
    const { title, description, status } = req.body;

    // Create a new task instance
    const newTask = new Task({
      title,
      description,
      status,
    });

    // Save the task to the database
    await newTask.save();

    // Respond with the created task object
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createTask, getAllTasks };
