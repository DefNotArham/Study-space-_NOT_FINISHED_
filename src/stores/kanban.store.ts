import { create } from "zustand";
import type { KanbanStore } from "../types/KanbanTypes";

const useKanbanStore = create<KanbanStore>((set) => ({
  updateStatus: async () => {},
}));
