import { useEffect, useState } from "react";
import {
  PlusIcon,
  UsersIcon,
  HashIcon,
  XIcon,
  LockIcon,
  DoorOpenIcon,
  CopyIcon,
} from "lucide-react";

import Logo from "../components/icons/logo";
import LoFiBackground from "../components/background";
import SidebarContents from "../components/auth/SideBarContents";
import { ChecklistIcon, CloseIcon } from "../components/icons/icons";
import { useStudyRoomStore } from "../stores/studyRoom.store";
import { useAuthStore } from "../stores/auth.store";

const inputClass =
  "w-full rounded-xl border border-[#3A2C22] bg-[#1B140F] px-3.5 py-2.5 text-[14px] text-[#F3E9DC] placeholder-[#6B5D50] outline-none transition-colors duration-200 focus:border-[#E3A567]/60 focus:ring-2 focus:ring-[#E3A567]/15";

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611]/85 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] backdrop-blur-sm ${className}`}
    >
      {children}
    </div>
  );
}

const StudyRoomsPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  // Form state
  const [roomName, setRoomName] = useState("");
  const [description, setDescription] = useState("");
  const [inviteCode, setInviteCode] = useState("");

  // Study room store and authenticated user
  const rooms = useStudyRoomStore((state) => state.rooms);
  const user = useAuthStore((state) => state.user);

  // Separate rooms created by the current user from rooms they joined.
  const hostedRooms = rooms.filter(
    (room) => String(room.host_id) === String(user?.id),
  );
  const joinedRooms = rooms.filter(
    (room) => String(room.host_id) !== String(user?.id),
  );

  const createRoom = useStudyRoomStore((state) => state.createRoom);
  const createRoomLoading = useStudyRoomStore(
    (state) => state.createRoomLoading,
  );
  const createRoomError = useStudyRoomStore((state) => state.createRoomError);

  const loadRoom = useStudyRoomStore((state) => state.loadRoom);
  const loadRoomLoading = useStudyRoomStore((state) => state.loadRoomLoading);
  const loadRoomError = useStudyRoomStore((state) => state.loadRoomError);

  useEffect(() => {
    void loadRoom();
  }, [loadRoom]);

  const closeCreateModal = () => {
    if (createRoomLoading) return;
    setCreateOpen(false);
    setRoomName("");
    setDescription("");
  };

  const closeJoinModal = () => {
    setJoinOpen(false);
    setInviteCode("");
  };

  const handleCreateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await createRoom(
      roomName.trim(),
      description.trim() || null,
    );

    if (success) {
      setCreateOpen(false);
      setRoomName("");
      setDescription("");
    }
  };

  // The join-room API action has not been added to the Zustand store yet.
  const handleJoinRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div
      className="relative min-h-screen bg-[#120C09]"
      style={{ fontFamily: "'Manrope', sans-serif" }}
    >
      <style>{`
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #120C09; }
        ::-webkit-scrollbar-thumb { background: #6B5543; border-radius: 9999px; }
        ::-webkit-scrollbar-thumb:hover { background: #80654D; }
        * { scrollbar-width: thin; scrollbar-color: #6B5543 #120C09; }
      `}</style>

      <LoFiBackground />

      <div className="relative z-10 flex min-h-screen">
        {/* Desktop sidebar */}
        <aside className="fixed inset-y-0 hidden w-64 shrink-0 flex-col border-r border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-6 backdrop-blur-sm md:flex">
          <SidebarContents />
        </aside>

        {/* Mobile top bar */}
        <header className="fixed inset-x-0 top-0 z-30 flex items-center justify-between border-b border-[#3A2C22]/70 bg-[#150F0B]/90 px-4 py-3 backdrop-blur-sm md:hidden">
          <Logo />
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#B8A99A] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
            aria-label="Open menu"
          >
            <ChecklistIcon className="h-5 w-5" />
          </button>
        </header>

        {/* Mobile drawer */}
        {mobileNavOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
              className="absolute inset-0 bg-black/60"
            />
            <div className="absolute inset-y-0 left-0 w-72 border-r border-[#3A2C22]/70 bg-[#150F0B] px-4 py-6 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
              <div className="mb-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[#B8A99A] hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                  aria-label="Close menu"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
              <SidebarContents />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-5 pb-16 pt-20 md:ml-64 md:px-10 md:pt-10">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8 flex animate-[ss-fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both] flex-wrap items-start justify-between gap-4">
              <div>
                <h1
                  className="text-[1.7rem] italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Study Rooms
                </h1>
                <p className="mt-1 text-[14px] text-[#8A7B6C]">
                  Study together, stay focused, and work with others.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setJoinOpen(true)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#3A2C22] bg-[#1D1611] px-4 py-2.5 text-[14px] font-medium text-[#C7B7A6] transition-all duration-200 hover:border-[#8B6040] hover:bg-[#251A13] hover:text-[#F3E9DC]"
                >
                  <HashIcon className="h-4 w-4" />
                  Join with code
                </button>
                <button
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] px-4 py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(201,125,74,0.7)] active:translate-y-0"
                >
                  <PlusIcon className="h-4 w-4" />
                  Create room
                </button>
              </div>
            </div>

            {/* Room count */}
            <Card className="mb-6 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[13px] text-[#8A7B6C]">Your study rooms</p>
                  <p className="mt-1 text-2xl font-semibold text-[#F3E9DC]">
                    {rooms.length}
                  </p>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E3A567]/15 bg-[#2A1F17]">
                  <UsersIcon className="h-5 w-5 text-[#E3A567]" />
                </div>
              </div>
            </Card>

            {/* Loading state */}
            {loadRoomLoading && (
              <Card className="flex min-h-[220px] flex-col items-center justify-center px-6 py-12 text-center">
                <div className="mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#6B5543] border-t-[#E3A567]" />
                <p className="text-sm text-[#B8A99A]">
                  Loading your study rooms...
                </p>
              </Card>
            )}

            {/* Loading error */}
            {!loadRoomLoading && loadRoomError && (
              <Card className="flex min-h-[220px] flex-col items-center justify-center px-6 py-12 text-center">
                <p className="text-sm text-red-400">{loadRoomError}</p>
                <button
                  type="button"
                  onClick={() => void loadRoom()}
                  className="mt-4 rounded-xl border border-[#3A2C22] px-4 py-2 text-sm text-[#E3A567] transition-colors hover:bg-[#251A13]"
                >
                  Try again
                </button>
              </Card>
            )}

            {/* Rooms you host */}
            {!loadRoomLoading && !loadRoomError && (
              <div className="mb-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2
                      className="text-lg italic tracking-tight text-[#F3E9DC]"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      Rooms you host
                    </h2>
                    <p className="mt-1 text-xs text-[#8A7B6C]">
                      Rooms you created and manage.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#E3A567]/20 bg-[#2A1F17] px-3 py-1 text-xs font-medium text-[#E3A567]">
                    {hostedRooms.length}
                  </span>
                </div>

                {hostedRooms.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {hostedRooms.map((room) => (
                      <Card key={room.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-[#F3E9DC]">
                              {room.name}
                            </h3>
                            <p className="mt-1 text-xs text-[#8A7B6C]">
                              Created {formatDate(room.created_at)}
                            </p>
                          </div>
                          <span className="shrink-0 rounded-lg border border-[#E3A567]/20 bg-[#2A1F17] px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#E3A567]">
                            Host
                          </span>
                        </div>

                        <p className="mt-4 min-h-10 text-sm leading-relaxed text-[#B8A99A]">
                          {room.description || "No description provided."}
                        </p>

                        <div className="mt-4 rounded-xl border border-[#3A2C22]/70 bg-[#150F0B]/70 p-3">
                          <p className="text-[11px] font-medium uppercase tracking-wide text-[#8A7B6C]">
                            Invitation code
                          </p>
                          <div className="mt-1 flex items-center justify-between gap-2">
                            <code className="font-mono text-sm tracking-widest text-[#E3A567]">
                              {room.invite_code}
                            </code>
                            <button
                              type="button"
                              onClick={() => {
                                void navigator.clipboard?.writeText(
                                  room.invite_code,
                                );
                              }}
                              className="rounded-lg p-2 text-[#8A7B6C] transition-colors hover:bg-[#2A1F17] hover:text-[#F3E9DC]"
                              aria-label={`Copy invitation code for ${room.name}`}
                              title="Copy invitation code"
                            >
                              <CopyIcon className="h-4 w-4" />
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {}}
                          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E3A567]/25 bg-gradient-to-b from-[#3A291D] to-[#2A1D14] px-4 py-2.5 text-[13px] font-semibold text-[#E8B679] transition-all duration-200 hover:border-[#E3A567]/50 hover:from-[#493321] hover:to-[#352317] hover:text-[#F3E9DC] active:scale-[0.99]"
                        >
                          <DoorOpenIcon className="h-4 w-4" />
                          Enter room
                        </button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="px-5 py-7 text-center">
                    <p className="text-sm text-[#B8A99A]">
                      You haven&apos;t created any rooms yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => setCreateOpen(true)}
                      className="mt-3 text-sm font-semibold text-[#E3A567] transition-colors hover:text-[#F3E9DC]"
                    >
                      Create your first room
                    </button>
                  </Card>
                )}
              </div>
            )}

            {/* Rooms you joined */}
            {!loadRoomLoading && !loadRoomError && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2
                      className="text-lg italic tracking-tight text-[#F3E9DC]"
                      style={{ fontFamily: "'Fraunces', serif" }}
                    >
                      Rooms you joined
                    </h2>
                    <p className="mt-1 text-xs text-[#8A7B6C]">
                      Other rooms you are a member of.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#3A2C22] bg-[#1D1611] px-3 py-1 text-xs font-medium text-[#B8A99A]">
                    {joinedRooms.length}
                  </span>
                </div>

                {joinedRooms.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {joinedRooms.map((room) => (
                      <Card key={room.id} className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-[#F3E9DC]">
                              {room.name}
                            </h3>
                            <p className="mt-1 text-xs text-[#8A7B6C]">
                              Created {formatDate(room.created_at)}
                            </p>
                          </div>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A1F17]">
                            <LockIcon className="h-4 w-4 text-[#B8A99A]" />
                          </span>
                        </div>

                        <p className="mt-4 min-h-10 text-sm leading-relaxed text-[#B8A99A]">
                          {room.description || "No description provided."}
                        </p>

                        <button
                          type="button"
                          onClick={() => {}}
                          className="mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#E3A567]/25 bg-gradient-to-b from-[#3A291D] to-[#2A1D14] px-4 py-2.5 text-[13px] font-semibold text-[#E8B679] transition-all duration-200 hover:border-[#E3A567]/50 hover:from-[#493321] hover:to-[#352317] hover:text-[#F3E9DC] active:scale-[0.99]"
                        >
                          <DoorOpenIcon className="h-4 w-4" />
                          Enter room
                        </button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="px-5 py-7 text-center">
                    <p className="text-sm text-[#B8A99A]">
                      You haven&apos;t joined any other rooms yet.
                    </p>
                    <button
                      type="button"
                      onClick={() => setJoinOpen(true)}
                      className="mt-3 text-sm font-semibold text-[#E3A567] transition-colors hover:text-[#F3E9DC]"
                    >
                      Join a room with a code
                    </button>
                  </Card>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Create Room Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeCreateModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            disabled={createRoomLoading}
          />

          <div className="relative w-full max-w-md rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] animate-[ss-fade-up_0.25s_ease-out_both]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  className="text-[1.2rem] italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Create a room
                </h2>
                <p className="mt-1 text-xs text-[#8A7B6C]">
                  Create a space for you and your friends.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCreateModal}
                disabled={createRoomLoading}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Close"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="room-name"
                  className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
                >
                  Room name
                </label>
                <input
                  id="room-name"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  placeholder="e.g. CS Study Group"
                  maxLength={100}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="room-description"
                  className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
                >
                  Description <span className="text-[#6B5D50]">(optional)</span>
                </label>
                <textarea
                  id="room-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What will you be studying?"
                  rows={3}
                  maxLength={500}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-[#3A2C22]/70 bg-[#150F0B]/70 p-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#2A1F17]">
                  <LockIcon className="h-4 w-4 text-[#E3A567]" />
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-[#F3E9DC]">
                    Private room
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-[#8A7B6C]">
                    Only people with your invitation code can join.
                  </p>
                </div>
              </div>

              {createRoomError && (
                <p role="alert" className="text-sm text-red-400">
                  {createRoomError}
                </p>
              )}

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  disabled={createRoomLoading}
                  className="flex-1 cursor-pointer rounded-xl border border-[#3A2C22] bg-[#1B140F] py-2.5 text-[14px] font-medium text-[#B8A99A] transition-colors hover:bg-[#251A13] hover:text-[#F3E9DC] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!roomName.trim() || createRoomLoading}
                  className="flex-1 cursor-pointer rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] shadow-[0_8px_20px_-6px_rgba(201,125,74,0.55)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  <PlusIcon className="mr-1 inline h-4 w-4" />
                  {createRoomLoading ? "Creating..." : "Create room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Room Modal */}
      {joinOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8">
          <button
            type="button"
            aria-label="Close modal"
            onClick={closeJoinModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-md rounded-2xl border border-[#3A2C22]/70 bg-[#1D1611] p-6 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.65)] animate-[ss-fade-up_0.25s_ease-out_both]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2
                  className="text-[1.2rem] italic tracking-tight text-[#F3E9DC]"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  Join a room
                </h2>
                <p className="mt-1 text-xs text-[#8A7B6C]">
                  Enter an invitation code to join a study room.
                </p>
              </div>
              <button
                type="button"
                onClick={closeJoinModal}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-[#8A7B6C] transition-colors duration-200 hover:bg-[#1B140F] hover:text-[#F3E9DC]"
                aria-label="Close"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleJoinRoom} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="invite-code"
                  className="mb-1.5 block text-[13px] font-medium text-[#B8A99A]"
                >
                  Invitation code
                </label>
                <input
                  id="invite-code"
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                  placeholder="Enter room code"
                  maxLength={12}
                  required
                  className={inputClass}
                />
              </div>

              <div className="rounded-xl border border-[#3A2C22]/70 bg-[#150F0B]/70 p-4">
                <p className="text-xs leading-relaxed text-[#8A7B6C]">
                  Joining rooms will be available once the join-room backend
                  endpoint and Zustand action are implemented.
                </p>
              </div>

              <button
                type="submit"
                disabled={!inviteCode.trim()}
                className="mt-1 flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#E8B679] to-[#C97D4A] py-2.5 text-[14px] font-semibold text-[#221407] opacity-50"
              >
                <DoorOpenIcon className="h-4 w-4" />
                Join room (not connected yet)
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRoomsPage;
