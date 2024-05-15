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
    <div className="home-container p-4 md:p-8 lg:p-12">
      <h2 className="text-2xl font-bold mb-6 ">Tasks:</h2>
      <div className="mb-8 flex justify-center">
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      </div>
      <div className="tasks-list">
        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default Home;
