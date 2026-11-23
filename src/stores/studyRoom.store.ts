import { create } from "zustand";

const useStudyRoomStore = create((set) => ({
  rooms: [],

  createRoomLoading: false,
  createRoomError: null,
}));
