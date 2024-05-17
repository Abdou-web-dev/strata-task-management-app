import { Request, Response } from "express";
import { Task } from "../models/Task";
import { CustomRequest } from "../middlewares/authenticate";

const getAllTasks = async (req: CustomRequest, res: Response) => {
  try {
    // Fetch tasks from the database
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

const createTask = async (req: CustomRequest, res: Response) => {
  try {
    const { title, description, status } = req.body;

    const newTask = new Task({
      title,
      description,
      status,
      userId: req.user._id, // Associate task with the authenticated user
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
const updateTask = async (req: CustomRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId: req.user._id },
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller method to delete a task
const deleteTask = async (req: CustomRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findOneAndDelete({
      _id: taskId,
      userId: req.user._id,
    });

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Failed to delete task, Internal server error" });
  }
};

const getTaskById = async (req: CustomRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    // Find the task by ID and ensure it belongs to the authenticated user
    const task = await Task.findOne({ _id: taskId, userId: req.user._id });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { createTask, getAllTasks, deleteTask, updateTask, getTaskById };
