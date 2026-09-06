export type User = {
  username: string;
  email: string;
  password: string;
};

export type AuthStore = {
  user: User | null;
  setUser: (user: User | null) => void;
};
