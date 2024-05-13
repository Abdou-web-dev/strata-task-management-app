import { Request, Response } from "express";
import { Task } from "../models/Task";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Fetch tasks from the database
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
