import { create } from "zustand";
import type { TaskStore } from "../types/TaskTypes";

const useTaskStore = create<TaskStore>((set) => ({
  Tasks: [],

  // Errors
  createTaskError: null,
  fetchTasksError: null,

  // Loadings
  fetchTasksLoading: false,
  createTaskLoading: false,
  deleteTaskLoading: false,

  fetchTasks: async () => {
    set({ fetchTasksLoading: true, fetchTasksError: null });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          fetchTasksLoading: false,
          fetchTasksError: "Authentication token not found",
        });
        return false;
      }

      const response = await fetch("http://127.0.0.1:8000/tasks/load-task", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          fetchTasksLoading: false,
          fetchTasksError: data.message || "Failed to load tasks",
        });
        return false;
      }

      set({
        Tasks: data.tasks,
        fetchTasksLoading: false,
      });

      return true;
    } catch (error) {
      console.error("Fetch tasks error:", error);

      set({
        fetchTasksLoading: false,
        fetchTasksError: "Something went wrong",
      });

      return false;
    }
  },

  createTask: async (task) => {
    set({ createTaskLoading: true, createTaskError: null });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          createTaskLoading: false,
          createTaskError: "Authorization token not found",
        });
        return false;
      }

      const response = await fetch("http://127.0.0.1:8000/tasks/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

      set((state) => ({
        Tasks: [...state.Tasks, data.task],
        createTaskLoading: false,
      }));

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
