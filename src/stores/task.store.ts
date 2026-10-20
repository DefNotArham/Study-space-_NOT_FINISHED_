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

  createTask: async (task) => {
    set({ createTaskLoading: true, createTaskError: null });

    try {
      const response = await fetch("http://127.0.0.1:8000/tasks/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          createTaskError: data.message || "Failed to create task",
          createTaskLoading: false,
        });
        return false;
      }

      set({ createTaskLoading: false });

      return true;
    } catch (error) {
      console.error(error);
      set({
        createTaskError: "Something went wrong",
        createTaskLoading: false,
      });
      return false;
    }
  },

  deleteTask: async (taskId) => {},
}));

export default useTaskStore;
