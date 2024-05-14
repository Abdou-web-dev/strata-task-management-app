import React, { useEffect, useState } from "react";
import { getTasks, createTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "../types/taskTypes";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          console.log(token, "token from Home page");
          const data = await getTasks(token);
          console.log(data, "tasks data from home page");
          setTasks(data);
        }
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (title: string, description: string, status: string) => {
    console.log("handleAddTask called");
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const newTask = await createTask(title, description, status, token);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <div>
      <h2>Tasks : </h2>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
