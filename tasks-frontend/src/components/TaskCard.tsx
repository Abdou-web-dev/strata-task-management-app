import { FunctionComponent, useContext } from "react";
import { Task } from "../types/taskTypes";
import trash from "../assets/img/trash.svg";
import { TasksContext } from "../context/tasksContext";
import { useMediaQuery } from "../hooks/UseMediaQuery";
import "../globalStyles/styles.scss";

interface TaskCardProps {
  task: Task;
  setTaskToDeleteId: React.Dispatch<React.SetStateAction<string>>;
  deleteOneTask: (taskId: string) => Promise<void>;
  setTaskToEdit: React.Dispatch<React.SetStateAction<Task | null>>;
}
const insertWhiteSpace = (text: string, interval: number) => {
  const regex = new RegExp(`(.{${interval}})`, "g");
  return text.replace(regex, "$1 ");
};

const TaskCard: FunctionComponent<TaskCardProps> = ({ setTaskToEdit, task, setTaskToDeleteId, deleteOneTask }) => {
  const { setEditModalOpen, setIsTaskModalOpen } = useContext(TasksContext);
  const isSmallScreen = useMediaQuery("(max-width: 1400px)"); // meaning < 1400px

  return (
    <div className="relative p-8 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
      <button
        onClick={() => {
          // open the delete modal only on large screens, and then delete the task
          if (!isSmallScreen) {
            setIsTaskModalOpen(true);
            setTaskToDeleteId(task?._id);
            console.log("task?._id", task?._id);
          } else {
            // on smaller screens, delete the task without confirm prompt
            deleteOneTask(task?._id);
          }
        }}
        className="top-2 right-2 absolute"
      >
        <img
          width={`30px`}
          src={trash}
          alt=""
        />
      </button>
      <h3 className="text-lg font-bold mb-2">{task.title}</h3>
      <div className={`${task?.description.length >= 180 ? "description__scroll" : ""}`}>
        <p className="text-gray-600 mb-2 break-words">{insertWhiteSpace(task?.description, 30)}</p>
      </div>
      <p className=" text-gray-500 mb-2">
        Status :
        <span className={`text-lg font-bold ${task.status === "pending" ? "text-sky-700" : "text-green-800"}`}>
          &nbsp;{task.status}
        </span>
      </p>
      <button
        onClick={() => {
          setEditModalOpen(true);
          setTaskToEdit(task);
        }}
        className="bottom-2 right-4 absolute bg-slate-400 hover:bg-slate-600 text-white px-4 py-0 pb-1 rounded-md  transition-all duration-300 ease-in-out"
      >
        <span className="text-xs">{"Edit"}</span>
      </button>
    </div>
  );
};

export default TaskCard;
