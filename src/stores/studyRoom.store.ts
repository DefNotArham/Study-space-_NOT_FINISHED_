import { create } from "zustand";
import type { StudyRoomStore } from "../types/StudyRoomTypes";
import { Flag } from "lucide-react";

export const useStudyRoomStore = create<StudyRoomStore>((set) => ({
  rooms: [],

  createRoomLoading: false,
  createRoomError: null,

  loadRoomLoading: false,
  loadRoomError: null,

  createRoom: async (name, description) => {
    set({ createRoomLoading: true, createRoomError: null });

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
        body: JSON.stringify({ name, description }),
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
        rooms: [data.room, ...state.rooms],
        createRoomLoading: false,
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

  loadRoom: async () => {
    set({ loadRoomLoading: true, loadRoomError: null });

    const token = localStorage.getItem("token");

    if (!token) {
      set({
        loadRoomLoading: false,
        loadRoomError: "Unable to find user token",
      });

      return false;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/room/load-rooms", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        set({
          loadRoomError: data.message || "Failed to load rooms",
          loadRoomLoading: false,
        });

        return false;
      }

      set({
        rooms: data.rooms,
        loadRoomLoading: false,
      });

      return true;
    } catch (error) {
      set({
        loadRoomError: "Something went wrong",
        loadRoomLoading: false,
      });

      return false;
    }
  },
}));
