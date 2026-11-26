export type StudyRoom = {
  id: number;
  host_id: number;
  name: string;
  description: string | null;
  invite_code: string;
  created_at: string;
};

export type StudyRoomStore = {
  rooms: StudyRoom[];

  createRoomLoading: boolean;
  createRoomError: string | null;

  loadRoomLoading: boolean;
  loadRoomError: string | null;

  deleteRoomLoading: boolean;
  deleteRoomError: string | null;

  joinRoomLoading: boolean;
  joinRoomError: string | null;

  leaveRoomLoading: boolean;
  leaveRoomError: string | null;

  createRoom: (name: string, description: string | null) => Promise<boolean>;
  loadRoom: () => Promise<boolean>;
  deleteRoom: (room_id: Number) => Promise<boolean>;
  joinRoom: (invite_code: string) => Promise<boolean>;
  leaveRoom: (room_id: string) => Promise<boolean>;
};
