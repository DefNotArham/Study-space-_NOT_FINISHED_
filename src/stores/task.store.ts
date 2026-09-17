import { create } from "zustand";
import type { TaskStore } from "../types/TaskTypes";

const useTaskStore = create<TaskStore>((set) => ({
  Tasks: [],

  // Errors
  createTaskError: null,

  // Loadings
  fetchTasksLoading: false,
  createTaskLoading: false,
  deleteTaskLoading: false,

  fetchTasks: async (user) => {},

  createTask: async (task) => {},

  deleteTask: async (taskId) => {},
}));

export default useTaskStore;
