import { create } from "zustand";
import type { JournalStore } from "../types/JournalTypes";

export const useJournalStore = create<JournalStore>((set) => ({
  journals: [],

  createJournalLoading: false,
  createJournalError: null,

  createJournal: async (title, content) => {
    set({
      createJournalLoading: true,
      createJournalError: null,
    });

    try {
    } catch (error) {}
  },
}));
