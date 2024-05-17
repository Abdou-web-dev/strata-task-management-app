import React, { useContext, useEffect, useState } from "react";
import { getTasks, createTask } from "../api/tasks";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { AuthContext } from "../context/authContext";
import { TasksContext } from "../context/tasksContext";
import Modal from "react-modal";
import closeIcon from "../../assets/img/close.svg";
import "../globalStyles/styles.scss";

const Home: React.FC = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { tasks, setTasks, filterStatus, setFilterStatus } = useContext(TasksContext);
  const [logOutModalOpen, setlogOutModalOpen] = useState(false);
  const [displayFilterButtons, setdisplayFilterButtons] = useState(false);
  const filteredTasks = filterStatus === "all" ? tasks : tasks.filter((task) => task.status === filterStatus);
  const [displayTaskForm, setdisplayTaskForm] = useState(true);
  const { editModalOpen } = useContext(TasksContext);

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
    <div className={`home-container p-4 md:p-8 lg:p-12 lg:pe-4 lg:pt-4 ${editModalOpen ? "blur_styles" : ""}`}>
      {/* logout button */}
      <div className="flex justify-end mb-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div className="taskform-container w-auto mb-8 flex justify-center ">
        <div className="w-full max-w-md p-12 relative">
          {displayTaskForm && <TaskForm onSubmit={handleAddTask} />}

          {tasks?.length > 1 && (
            <>
              {displayTaskForm ? (
                <button
                  onClick={() => {
                    setdisplayTaskForm(false);
                  }}
                  className="top-2 right-2 absolute"
                >
                  <img
                    width={`30px`}
                    src={closeIcon}
                    alt=""
                  />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setdisplayTaskForm(true)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                  Add Task
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div>
        {tasks.length > 0 && (
          <h2 className="text-2xl text-slate-700 mb-6 text-center font-roboto">Available Tasks :</h2>
        )}
      </div>

      <div className="filter--btn_and-control_buttons md:flex gap-24">
        <div className="flex justify-start mb-4">
          {/* Filter button */}
          <button
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded"
            onClick={() => setdisplayFilterButtons(!displayFilterButtons)}
          >
            Filter Tasks
          </button>
        </div>

        {displayFilterButtons ? (
          <div>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded mr-8"
              onClick={() => setFilterStatus("all")}
            >
              All
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded mr-8"
              onClick={() => setFilterStatus("pending")}
            >
              Pending
            </button>
            <button
              className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-1 px-3 rounded"
              onClick={() => setFilterStatus("completed")}
            >
              Completed
            </button>
          </div>
        ) : null}
      </div>

      <div className="tasks-list">
        <TaskList
          tasks={tasks}
          {...{ filteredTasks }}
        />
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

// W9IwXb!jX+(%CDJM
