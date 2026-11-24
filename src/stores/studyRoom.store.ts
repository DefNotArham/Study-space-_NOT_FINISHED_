import { create } from "zustand";
import type { StudyRoomStore } from "../types/StudyRoomTypes";

const useStudyRoomStore = create<StudyRoomStore>((set) => ({
  rooms: [],

  createRoomLoading: false,
  createRoomError: null,

  createRoom: async (title, description) => {
    set({ createRoomLoading: false, createRoomError: null });

    const token = localStorage.getItem("token");
    if (!token) {
      set({
        createRoomError: "Unable to find user token",
        createRoomLoading: false,
      });

      return false;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/room/create-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          createRoomError: data.message,
          createRoomLoading: false,
        });

        return false;
      }

      set((state) => ({
        rooms: [data.room, state.rooms],
      }));

      return true;
    } catch (error) {
      set({
        createRoomError: "Something went wrong",
        createRoomLoading: false,
      });

      return false;
    }
  },
}));
