import { Request, Response } from "express";
import { Task } from "../models/Task";
import { CustomRequest } from "../index";

const getAllTasks = async (req: CustomRequest, res: Response) => {
  try {
    // Fetch tasks from the database
    // res.send("Welcome to the Task Management App"); // Send a welcome message or render a homepage
    // const tasks = await Task.find();

    const tasks = await Task.find({ userId: req.user._id });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller method to retrieve tasks filtered by status
const getTasksByStatus = async (req: CustomRequest, res: Response) => {
  // @ts-ignore
  const { status } = req.params;

  try {
    // Fetch tasks associated with the authenticated user filtered by status
    const tasks = await Task.find({ userId: req.user._id, status });

    // Respond with the filtered tasks
    res.json(tasks);
  } catch (error) {
    // Handle errors
    console.error("Error retrieving tasks by status:", error);
    res.status(500).json({ message: "Failed to retrieve tasks by status" });
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

// Controller method to update a task
const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { title, description, status } = req.body;

  try {
    // Find the task by ID and update its properties
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description, status },
      { new: true } // Return the updated task
    );

    // Check if the task exists and is associated with the authenticated user
    // @ts-ignore
    if (!updatedTask || updatedTask.userId.toString() !== req.user._id) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Respond with the updated task
    res.json(updatedTask);
  } catch (error) {
    // Handle errors
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Failed to update task" });
  }
};

// Controller method to delete a task
const deleteTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;

  try {
    // Find the task by ID and delete it
    const deletedTask = await Task.findByIdAndDelete(taskId);

    // @ts-ignore
    // Check if the task exists and is associated with the authenticated user
    if (!deletedTask || deletedTask.userId.toString() !== req.user._id) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Respond with a success message
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

export { createTask, getAllTasks, deleteTask, updateTask };
