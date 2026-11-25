import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCreatorToListAPI,
  createUserListAPI,
  deleteUserListAPI,
  getCreatorListIdsAPI,
  getErrorMessage,
  listCreatorsInListAPI,
  listMyListsAPI,
  removeCreatorFromListAPI,
  updateUserListAPI,
} from "@/lib/graphql/handleApi";
import { Creator } from "@/lib/models/creator";
import { UserList, UserListInput } from "@/lib/models/list";

export const LIST_CREATORS_PAGE_SIZE = 50;

interface ListCreatorsState {
  items: Creator[];
  nextToken: string | null;
  loading: boolean;
  loadingMore: boolean;
  loaded: boolean;
  error: string | null;
}

interface ListsState {
  items: UserList[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  creators: Record<string, ListCreatorsState>;
  membership: Record<string, string[]>;
  membershipLoading: Record<string, boolean>;
  pickerCreator: Creator | null;
}

const initialState: ListsState = {
  items: [],
  loading: false,
  loaded: false,
  error: null,
  creators: {},
  membership: {},
  membershipLoading: {},
  pickerCreator: null,
};

const emptyCreators = (): ListCreatorsState => ({
  items: [],
  nextToken: null,
  loading: false,
  loadingMore: false,
  loaded: false,
  error: null,
});

const reject = (fallback: string) => (error: unknown) => getErrorMessage(error, fallback);

export const fetchLists = createAsyncThunk("lists/fetchLists", async (_: void, { rejectWithValue }) => {
  try {
    return await listMyListsAPI();
  } catch (error) {
    return rejectWithValue(reject("Couldn't load your lists")(error));
  }
});

export const createList = createAsyncThunk(
  "lists/createList",
  async (input: UserListInput, { rejectWithValue }) => {
    try {
      return await createUserListAPI(input);
    } catch (error) {
      return rejectWithValue(reject("Couldn't create the list")(error));
    }
  },
);

export const updateList = createAsyncThunk(
  "lists/updateList",
  async ({ id, input }: { id: string; input: UserListInput }, { rejectWithValue }) => {
    try {
      return await updateUserListAPI(id, input);
    } catch (error) {
      return rejectWithValue(reject("Couldn't update the list")(error));
    }
  },
);

export const deleteList = createAsyncThunk("lists/deleteList", async (id: string, { rejectWithValue }) => {
  try {
    await deleteUserListAPI(id);
    return id;
  } catch (error) {
    return rejectWithValue(reject("Couldn't delete the list")(error));
  }
});

export const fetchListCreators = createAsyncThunk(
  "lists/fetchListCreators",
  async ({ listId, nextToken }: { listId: string; nextToken?: string | null }, { rejectWithValue }) => {
    try {
      const page = await listCreatorsInListAPI(listId, LIST_CREATORS_PAGE_SIZE, nextToken);
      return { listId, append: Boolean(nextToken), ...page };
    } catch (error) {
      return rejectWithValue(reject("Couldn't load creators in this list")(error));
    }
  },
);

export const fetchCreatorListIds = createAsyncThunk(
  "lists/fetchCreatorListIds",
  async (creatorId: string, { rejectWithValue }) => {
    try {
      return { creatorId, listIds: await getCreatorListIdsAPI(creatorId) };
    } catch (error) {
      return rejectWithValue(reject("Couldn't check this creator's lists")(error));
    }
  },
);

export const addCreatorToList = createAsyncThunk(
  "lists/addCreatorToList",
  async ({ listId, creator }: { listId: string; creator: Creator }, { rejectWithValue }) => {
    try {
      return { list: await addCreatorToListAPI(listId, creator.id), creator };
    } catch (error) {
      return rejectWithValue(reject("Couldn't add the creator")(error));
    }
  },
);

export const removeCreatorFromList = createAsyncThunk(
  "lists/removeCreatorFromList",
  async ({ listId, creatorId }: { listId: string; creatorId: string }, { rejectWithValue }) => {
    try {
      return { list: await removeCreatorFromListAPI(listId, creatorId), creatorId };
    } catch (error) {
      return rejectWithValue(reject("Couldn't remove the creator")(error));
    }
  },
);

const sortLists = (lists: UserList[]) => lists.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

const upsertList = (state: ListsState, list: UserList) => {
  const index = state.items.findIndex((l) => l.id === list.id);
  if (index >= 0) state.items[index] = list;
  else state.items.push(list);
  sortLists(state.items);
};

const setMembership = (state: ListsState, creatorId: string, listId: string, member: boolean) => {
  const current = state.membership[creatorId];
  if (!current) {
    if (member) state.membership[creatorId] = [listId];
    return;
  }
  const without = current.filter((id) => id !== listId);
  state.membership[creatorId] = member ? [...without, listId] : without;
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    openListPicker: (state, action: PayloadAction<Creator>) => {
      state.pickerCreator = action.payload;
    },
    closeListPicker: (state) => {
      state.pickerCreator = null;
    },
    resetLists: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.items = sortLists([...action.payload]);
        state.loading = false;
        state.loaded = true;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.loaded = true;
        state.error = action.payload as string;
      })
      .addCase(createList.fulfilled, (state, action) => upsertList(state, action.payload))
      .addCase(updateList.fulfilled, (state, action) => upsertList(state, action.payload))
      .addCase(deleteList.fulfilled, (state, action) => {
        state.items = state.items.filter((l) => l.id !== action.payload);
        delete state.creators[action.payload];
        Object.keys(state.membership).forEach((creatorId) => {
          state.membership[creatorId] = state.membership[creatorId].filter((id) => id !== action.payload);
        });
      })
      .addCase(fetchListCreators.pending, (state, action) => {
        const entry = (state.creators[action.meta.arg.listId] ||= emptyCreators());
        if (action.meta.arg.nextToken) entry.loadingMore = true;
        else entry.loading = true;
        entry.error = null;
      })
      .addCase(fetchListCreators.fulfilled, (state, action) => {
        const { listId, items, nextToken, append } = action.payload;
        const entry = (state.creators[listId] ||= emptyCreators());
        if (append) {
          const seen = new Set(entry.items.map((c) => c.id));
          entry.items.push(...items.filter((c) => !seen.has(c.id)));
        } else {
          entry.items = items;
        }
        entry.nextToken = nextToken ?? null;
        entry.loading = false;
        entry.loadingMore = false;
        entry.loaded = true;
      })
      .addCase(fetchListCreators.rejected, (state, action) => {
        const entry = (state.creators[action.meta.arg.listId] ||= emptyCreators());
        entry.loading = false;
        entry.loadingMore = false;
        entry.loaded = true;
        entry.error = action.payload as string;
      })
      .addCase(fetchCreatorListIds.pending, (state, action) => {
        state.membershipLoading[action.meta.arg] = true;
      })
      .addCase(fetchCreatorListIds.fulfilled, (state, action) => {
        state.membership[action.payload.creatorId] = action.payload.listIds;
        state.membershipLoading[action.payload.creatorId] = false;
      })
      .addCase(fetchCreatorListIds.rejected, (state, action) => {
        state.membershipLoading[action.meta.arg] = false;
      })
      .addCase(addCreatorToList.pending, (state, action) => {
        setMembership(state, action.meta.arg.creator.id, action.meta.arg.listId, true);
      })
      .addCase(addCreatorToList.fulfilled, (state, action) => {
        const { list, creator } = action.payload;
        upsertList(state, list);
        const entry = state.creators[list.id];
        if (entry?.loaded && !entry.items.some((c) => c.id === creator.id)) entry.items.unshift(creator);
      })
      .addCase(addCreatorToList.rejected, (state, action) => {
        setMembership(state, action.meta.arg.creator.id, action.meta.arg.listId, false);
      })
      .addCase(removeCreatorFromList.pending, (state, action) => {
        setMembership(state, action.meta.arg.creatorId, action.meta.arg.listId, false);
      })
      .addCase(removeCreatorFromList.fulfilled, (state, action) => {
        const { list, creatorId } = action.payload;
        upsertList(state, list);
        const entry = state.creators[list.id];
        if (entry) entry.items = entry.items.filter((c) => c.id !== creatorId);
      })
      .addCase(removeCreatorFromList.rejected, (state, action) => {
        setMembership(state, action.meta.arg.creatorId, action.meta.arg.listId, true);
      });
  },
});

export const { openListPicker, closeListPicker, resetLists } = listsSlice.actions;
export default listsSlice.reducer;
