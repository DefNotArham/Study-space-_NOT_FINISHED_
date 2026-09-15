import { create } from "zustand";

import { supabase } from "../lib/supabase";

import type { TaskStore } from "../types/TaskTypes";
import type { User } from "@supabase/supabase-js";
import type { CreateTask } from "../types/TaskTypes";

const useTaskStore = create<TaskStore>((set) => ({
  Tasks: [],

  // Errors
  createTaskError: null,

  // Loadings
  createTaskLoading: false,
  deleteTaskLoading: false,

  fetchTasks: async (user: User) => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        console.log(error);
        return;
      }

      set({
        Tasks: data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  createTask: async (task: CreateTask) => {
    set({
      createTaskLoading: true,
      createTaskError: null,
    });

    if (!task.user_id) {
      set({
        createTaskError: "User ID not found",
        createTaskLoading: false,
      });

      setTimeout(() => {
        set({ createTaskError: null });
      }, 2000);

      return;
    }

    if (!task.title.trim()) {
      set({
        createTaskError: "Task title is required",
        createTaskLoading: false,
      });

      setTimeout(() => {
        set({ createTaskError: null });
      }, 2000);

      return;
    }

    if (!task.priority) {
      set({
        createTaskError: "Choose a priority",
        createTaskLoading: false,
      });

      setTimeout(() => {
        set({ createTaskError: null });
      }, 2000);

      return;
    }
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

      if (error) {
        console.log(error);
        set({
          createTaskError: error.message,
          createTaskLoading: false,
        });

        setTimeout(() => {
          set({ createTaskError: null });
        }, 2000);
        return;
      }

      set((state) => ({
        Tasks: [...state.Tasks, data],
        createTaskLoading: false,
      }));
    } catch (error) {
      console.log(error);
      set({
        createTaskLoading: false,
        createTaskError:
          error instanceof Error ? error.message : "Something went wrong",
      });

      setTimeout(() => {
        set({ createTaskError: null });
      }, 2000);
    }
  },

  deleteTask: async (taskId) => {
    set({
      deleteTaskLoading: true,
    });

    try {
      const { error } = await supabase.from("tasks").delete().eq("id", taskId);

      if (error) {
        console.log(error);
        set({ deleteTaskLoading: false });
        return;
      }

      set((state) => ({
        Tasks: state.Tasks.filter((t) => t.id !== taskId),
        deleteTaskLoading: false,
      }));
    } catch (error) {
      console.log(error);
      set({
        deleteTaskLoading: false,
      });
    }
  },
}));

export default useTaskStore;
