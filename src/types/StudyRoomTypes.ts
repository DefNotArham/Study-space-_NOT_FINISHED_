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

  createRoom: (name: string, description: string | null) => Promise<boolean>;
  loadRoom: () => Promise<boolean>;
};
