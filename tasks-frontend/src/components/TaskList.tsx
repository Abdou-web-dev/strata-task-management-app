import React, { useContext, useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../types/taskTypes";
import Modal from "react-modal";
import { TasksContext } from "../context/tasksContext";
import { deleteTask, updateTask } from "../api/tasks";
import "../globalStyles/styles.scss";
import { useMediaQuery } from "../hooks/UseMediaQuery";
import EditModal from "./modals/EditModal";

interface TaskListProps {
  tasks: Task[];
  filteredTasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks, filteredTasks }) => {
  const { isTaskModalOpen, setIsTaskModalOpen, setTasks } = useContext(TasksContext);
  const [taskToDeleteId, setTaskToDeleteId] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 1400px)"); // meaning < 1400px
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const handleEditTask = async (
    taskId: string,
    newTitle?: string,
    newDesc?: string,
    newStatus?: "completed" | "pending"
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const updatedTask = await updateTask(taskId, token, newTitle, newDesc, newStatus);
        // Update the tasks state with the updated task
        setTasks((prevTasks) => prevTasks?.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      }
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const deleteOneTask = async (taskId: string) => {
    try {
      //delete from db
      const token = localStorage.getItem("token");
      if (token) {
        await deleteTask(taskId, token);
      }
      // Filter out the deleted task from the tasks array
      //delete from the UI
      const updatedTasks = tasks.filter((task) => task?._id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    // Set the app element for react-modal
    Modal.setAppElement("#root");
    //react-modal: App element is not defined. Please use `Modal.setAppElement(el)` or set `appElement={el}`. This is needed so screen readers don't see main content when modal is opened.
  }, []);

  return (
    <div className="tasks-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {/* <>
        {tasks?.map((task) => (
          <TaskCard
            {...{ setTaskToEdit, task, setTaskToDeleteId, deleteOneTask }}
            key={task._id}
          ></TaskCard>
        ))}
      </> */}
      <>
        {filteredTasks?.map((filteredTask) => (
          <TaskCard
            {...{ setTaskToEdit, task: filteredTask, setTaskToDeleteId, deleteOneTask }}
            key={filteredTask._id}
          ></TaskCard>
        ))}
      </>
      {/* Modal with delete functionality */}
      <Modal
        isOpen={isTaskModalOpen}
        onRequestClose={() => setIsTaskModalOpen(false)}
        contentLabel="Delete Prompt Modal"
        style={{
          content: {
            width: "30%",
            height: "30%",
            margin: "0 auto",
          },
        }}
        className={"tasks-modal"}
      >
        <h3>Are you sure you want to delete this task ?</h3>
        <div className="modal-btns">
          <button
            className={`modal-btn-yes`}
            onClick={() => {
              if (!isSmallScreen) {
                deleteOneTask(taskToDeleteId);
                setIsTaskModalOpen(false);
              }
            }}
          >
            <span>YES</span>
          </button>
          <button
            className={`modal-btn-no`}
            onClick={() => {
              if (!isSmallScreen) {
                setIsTaskModalOpen(false);
              }
            }}
          >
            <span>NO</span>
          </button>
        </div>
      </Modal>
      {taskToEdit && (
        <EditModal
          // isOpen={Boolean(taskToEdit)}
          onRequestClose={() => setTaskToEdit(null)}
          taskToEdit={taskToEdit}
          onSave={handleEditTask}
        />
      )}
    </div>
  );
};

export default TaskList;
