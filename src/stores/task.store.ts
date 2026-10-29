import { create } from "zustand";
import type { TaskStore } from "../types/TaskTypes";

const useTaskStore = create<TaskStore>((set) => ({
  Tasks: [],

  // Errors
  createTaskError: null,
  fetchTasksError: null,
  deleteTaskError: null,

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
        Tasks: [data.task, ...state.Tasks],
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

  deleteTask: async (taskId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      set({
        deleteTaskError: "Authentication token not found",
      });

      return false;
    }

    set({ deleteTaskLoading: true, deleteTaskError: null });

    const previousTasks = useTaskStore.getState().Tasks;

    set((state) => ({
      Tasks: state.Tasks.filter((task) => {
        return task.id === taskId;
      }),
    }));

    try {
      const response = await fetch("http://127.0.0.1:8000/tasks/delete-task", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          task_id: Number(taskId),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          Tasks: previousTasks,
          deleteTaskLoading: false,
          deleteTaskError: data.message || "Failed to delete task",
        });

        return false;
      }

      set({
        deleteTaskLoading: false,
      });

      return true;
    } catch (error) {
      console.log(error);

      set({
        Tasks: previousTasks,
        deleteTaskLoading: false,
        deleteTaskError: "Something went wrong while deleting the task",
      });

      return false;
    }
  },

  updateTaskCompleted: async (taskId, completed) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return false;
    }

    const previousTasks = useTaskStore.getState().Tasks;

    set((state) => ({
      Tasks: state.Tasks.map((task) => {
        if (task.id === Number(taskId)) {
          return {
            ...task,
            completed: completed,
          };
        }

        return task;
      }),
    }));

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/tasks/update-task-completed",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            task_id: Number(taskId),
            completed: completed,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        console.error(data.message || "Failed to update task completion");

        set({
          Tasks: previousTasks,
        });

        return false;
      }

      return true;
    } catch (error) {
      console.error("Update task completion error:", error);

      set({
        Tasks: previousTasks,
      });

      return false;
    }
  },
}));

export default useTaskStore;
