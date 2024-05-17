import { FunctionComponent, useContext } from "react";
import { Task } from "../types/taskTypes";
import trash from "../assets/img/trash.svg";
import { TasksContext } from "../context/tasksContext";

interface TaskCardProps {
  task: Task;
  setTaskToDeleteId: React.Dispatch<React.SetStateAction<string>>;
}
const insertWhiteSpace = (text: string, interval: number) => {
  const regex = new RegExp(`(.{${interval}})`, "g");
  return text.replace(regex, "$1 ");
};

const TaskCard: FunctionComponent<TaskCardProps> = ({ task, setTaskToDeleteId }) => {
  const { isTaskModalOpen, setIsTaskModalOpen } = useContext(TasksContext);

  return (
    <div className="relative p-4 bg-white rounded-lg shadow-md transition-all duration-300 ease-in-out hover:shadow-lg">
      <button
        onClick={() => {
          setIsTaskModalOpen(true);
          setTaskToDeleteId(task?._id);
          console.log("task?._id", task?._id);
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
      <p className="text-gray-600 mb-2 break-words">{insertWhiteSpace(task?.description, 30)}</p>
      <p className="text-sm text-gray-500 mb-2">Status: {task.status}</p>
    </div>
  );
};

export default TaskCard;
