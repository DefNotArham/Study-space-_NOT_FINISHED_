import { create } from "zustand";
import type { JournalStore } from "../types/JournalTypes";

export const useJournalStore = create<JournalStore>((set) => ({
  journals: [],

  createJournalLoading: false,
  createJournalError: null,

  loadJournalsLoading: false,
  loadJournalsError: null,

  createJournal: async (title, content) => {
    set({
      createJournalLoading: true,
      createJournalError: null,
    });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          createJournalError: "Unable to find user token",
          createJournalLoading: false,
        });

        return false;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/journal/create-journal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content }),
        },
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          createJournalError: data.message || "Something went wrong",
          createJournalLoading: false,
        });
        return false;
      }
      set((state) => ({
        journals: [data.journal, ...state.journals],
        createJournalLoading: false,
      }));

      return true;
    } catch (error) {
      console.log(error);

      set({
        createJournalError: "Something went wrong",
        createJournalLoading: false,
      });

      return false;
    }
  },

  loadJournals: async () => {
    set({
      loadJournalsLoading: true,
      loadJournalsError: null,
    });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        set({
          loadJournalsError: "Unable to find user token",
          loadJournalsLoading: false,
        });

        return false;
      }

      const response = await fetch("http://127.0.0.1/journal/load-journals", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          loadJournalsError: data.message || "Something went wrong",
          loadJournalsLoading: false,
        });

        return false;
      }

      return true;
    } catch (error) {
      console.log(error);

      set({
        loadJournalsError: "Something went wrong",
        loadJournalsLoading: false,
      });

      return false;
    }
  },
}));
