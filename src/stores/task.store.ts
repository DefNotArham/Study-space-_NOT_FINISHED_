import { create } from "zustand";

import { supabase } from "../lib/supabase";

import type { TaskStore } from "../types/TaskTypes";
import type { User } from "@supabase/supabase-js";

const useTaskStore = create<TaskStore>((set) => ({
  Tasks: [],

  fetchTasks: async (user: User) => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user?.id);

      if (error) return console.log(error);

      set({
        Tasks: data,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTaskStore;
