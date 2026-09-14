import { create } from "zustand";

import { supabase } from "../lib/supabase";

import type { TaskStore } from "../types/TaskTypes";
import type { User } from "@supabase/supabase-js";
import type { CreateTask } from "../types/TaskTypes";

const useTaskStore = create<TaskStore>((set) => ({
  Tasks: [],

  createTaskError: null,
  createTaskLoading: false,

  fetchTasks: async (user: User) => {
    set({ createTaskLoading: true });

    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        set({ createTaskError: error.message, createTaskLoading: false });
        console.log(error);
        return;
      }

      set({
        Tasks: data,
        createTaskLoading: false,
      });
    } catch (error) {
      console.log(error);
      set({
        createTaskLoading: false,
        createTaskError:
          error instanceof Error ? error?.message : "Something went wrong",
      });
    }
  },

  createTask: async (task: CreateTask) => {
    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert(task)
        .select()
        .single();

      if (error) return console.log(error);

      set((state) => ({
        Tasks: [...state.Tasks, data],
      }));
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTaskStore;
