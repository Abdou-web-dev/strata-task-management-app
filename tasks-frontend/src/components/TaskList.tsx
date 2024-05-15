import React from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
}

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <div className="tasks-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="p-4 bg-white rounded-lg shadow-md"
        >
          <h3 className="text-lg font-bold">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
