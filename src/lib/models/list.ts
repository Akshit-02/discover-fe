/** Mirrors MAX_CREATORS_PER_LIST in the lists Lambda; the backend enforces it. */
export const MAX_CREATORS_PER_LIST = 50;
/** Mirrors MAX_LISTS_PER_USER in the lists Lambda. */
export const MAX_LISTS_PER_USER = 100;

export interface UserList {
  id: string;
  name: string;
  description?: string | null;
  creatorCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserListInput {
  name?: string;
  description?: string;
}
