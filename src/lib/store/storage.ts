import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const noopStorage = {
  getItem: () => Promise.resolve(null),
  setItem: (_key: string, value: string) => Promise.resolve(value),
  removeItem: () => Promise.resolve(),
};

const storage =
  typeof window !== "undefined" ? createWebStorage("local") : noopStorage;

export default storage;
