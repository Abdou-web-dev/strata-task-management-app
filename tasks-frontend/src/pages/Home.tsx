import React, { useContext, useEffect, useState } from "react";
import { getTasks, createTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { Task } from "../types/taskTypes";
import { AuthContext } from "../context/authContext";
import { useFormik } from "formik";
import { taskValidationSchema } from "../validation/taskValidationSchema";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const { setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
  };

  // fetch tasks from the db on first render
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        // console.log(token, "token from Home page");
        const data = await getTasks(token);
        console.log(data, "tasks data from home page");
        setTasks(data);
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (title: string, description: string, status: string) => {
    // console.log("handleAddTask called");
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
        <div className="w-full max-w-md p-4">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      </div>
      <div className="tasks-list">
        <TaskList tasks={tasks} />
      </div>

      {/* logout button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
