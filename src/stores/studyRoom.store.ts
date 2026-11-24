import { create } from "zustand";
import type { StudyRoomStore } from "../types/StudyRoomTypes";

const useStudyRoomStore = create<StudyRoomStore>((set) => ({
  rooms: [],

  createRoomLoading: false,
  createRoomError: null,

  createRoom: async (title, description) => {
    set({ createRoomLoading: false, createRoomError: null });
    try {
    } catch (error) {}
  },
}));
