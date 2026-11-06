import { create } from "zustand";
import type { KanbanStore, TaskStatus } from "../types/KanbanTypes";
import useTaskStore from "./task.store";

const useKanbanStore = create<KanbanStore>((set, get) => ({
  updateStatus: (taskId, status) => {
    const tasks = useTaskStore.getState().Tasks;

    const previousTask = tasks.find((task) => task.id === taskId);

    if (!previousTask) return false;

    // Update frontend immediately
    useTaskStore.setState((state) => ({
      Tasks: state.Tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status,
              completed: status === "completed",
            }
          : task,
      ),
    }));

    // Update backend in the background
    void (async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8000/kanban/update-status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              task_id: taskId,
              status,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to update task status");
        }

        return true;
      } catch (error) {
        console.error("Kanban status update failed:", error);

        // Revert frontend if backend request fails
        useTaskStore.setState((state) => ({
          Tasks: state.Tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  status: previousTask.status,
                  completed: previousTask.completed,
                }
              : task,
          ),
        }));

        return false;
      }
    })();
  },
}));

export default useKanbanStore;
