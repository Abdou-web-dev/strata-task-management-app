import React, { useState } from "react";
import { Task } from "../types/taskTypes";

export interface TasksContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  isTaskModalOpen: boolean;
  setIsTaskModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editModalOpen: boolean;
  setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const TasksContext = React.createContext<TasksContextType>({
  tasks: [],
  setTasks: () => {},
  isTaskModalOpen: false,
  setIsTaskModalOpen: () => {},
  editModalOpen: false,
  setEditModalOpen: () => {},
});

export const TasksContextProvider = ({ children }: { children: React.ReactNode | JSX.Element | JSX.Element[] }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        isTaskModalOpen,
        setIsTaskModalOpen,
        editModalOpen,
        setEditModalOpen,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
