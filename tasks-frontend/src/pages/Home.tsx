import React, { useContext, useEffect, useState } from "react";
import { getTasks, createTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/authContext";
import { TasksContext } from "../context/tasksContext";
import Modal from "react-modal";

const Home: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { tasks, setTasks } = useContext(TasksContext);
  const [logOutModalOpen, setlogOutModalOpen] = useState(false);

  const handleLogout = () => {
    setlogOutModalOpen(true);
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
        // console.log(tasks.length, "tasks.length");
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
    <div className="home-container p-4 md:p-8 lg:p-12 lg:pe-4 lg:pt-4">
      {/* logout button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="mb-8 flex justify-center">
        <div className="w-full max-w-md p-4">
          <TaskForm onSubmit={handleAddTask} />
        </div>
      </div>

      <div>
        {tasks.length > 0 && (
          <h2 className="text-2xl text-slate-700 mb-6 text-center font-roboto">Available Tasks :</h2>
        )}
      </div>

      <div className="tasks-list">
        <TaskList tasks={tasks} />
      </div>

      {/* Modal with delete functionality */}
      <Modal
        isOpen={logOutModalOpen}
        onRequestClose={() => setlogOutModalOpen(false)}
        contentLabel="Delete Prompt Modal"
        style={{
          content: {
            width: "30%",
            height: "30%",
            margin: "0 auto",
          },
        }}
        className={"tasks-modal logout-modal"}
      >
        <h3>Are you sure you want to logout ?</h3>
        <div className="modal-btns">
          <button
            className={`modal-btn-yes`}
            onClick={() => {
              setIsLoggedIn(false);
              // Remove token from localStorage
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
            }}
          >
            <span>YES</span>
          </button>
          <button
            className={`modal-btn-no`}
            onClick={() => {
              setlogOutModalOpen(false);
            }}
          >
            <span>NO</span>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
