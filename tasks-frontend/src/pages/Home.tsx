import React, { useEffect, useState } from "react";
import { getTasks, createTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const data = await getTasks(token);
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
      <h2>Tasks</h2>
      <TaskForm onSubmit={handleAddTask} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Home;
