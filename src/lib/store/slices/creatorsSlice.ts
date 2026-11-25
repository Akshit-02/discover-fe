import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { creatorFilterOptionsAPI, getErrorMessage, getErrorType, listCreatorsAPI } from "@/lib/graphql/handleApi";
import { Creator, CreatorFilterOptions, CreatorSearchStats } from "@/lib/models/creator";

export const CREATORS_PAGE_SIZE = 24;

interface CreatorsState {
  items: Creator[];
  nextToken: string | null;
  totalCount: number | null;
  stats: CreatorSearchStats | null;
  /** Serialised filter+sort the current items belong to. */
  queryKey: string | null;
  loading: boolean;
  loadingMore: boolean;
  hasLoaded: boolean;
  error: string | null;
  /** GraphQL errorType of `error`, e.g. "InsufficientCredits". */
  errorType: string | null;
  options: CreatorFilterOptions | null;
  optionsLoading: boolean;
}

const initialState: CreatorsState = {
  items: [],
  nextToken: null,
  totalCount: null,
  stats: null,
  queryKey: null,
  loading: false,
  loadingMore: false,
  hasLoaded: false,
  error: null,
  errorType: null,
  options: null,
  optionsLoading: false,
};

export interface FetchCreatorsArgs {
  filter: Record<string, unknown>;
  sort: string;
  nextToken?: string | null;
}

export const creatorsQueryKey = (filter: Record<string, unknown>, sort: string) =>
  JSON.stringify({ filter, sort });

export const fetchCreators = createAsyncThunk(
  "creators/fetchCreators",
  async ({ filter, sort, nextToken }: FetchCreatorsArgs, { rejectWithValue }) => {
    try {
      return await listCreatorsAPI({ filter, sort, limit: CREATORS_PAGE_SIZE, nextToken });
    } catch (error) {
      return rejectWithValue({
        message: getErrorMessage(error, "Couldn't load creators"),
        type: getErrorType(error),
      });
    }
  },
);

export const fetchFilterOptions = createAsyncThunk(
  "creators/fetchFilterOptions",
  async (_: void, { rejectWithValue }) => {
    try {
      return await creatorFilterOptionsAPI();
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Couldn't load filters"));
    }
  },
  { condition: (_, { getState }) => {
    const { creators } = getState() as { creators: CreatorsState };
    return !creators.options && !creators.optionsLoading;
  } },
);

const creatorsSlice = createSlice({
  name: "creators",
  initialState,
  reducers: {
    resetCreators: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCreators.pending, (state, action) => {
      const { filter, sort, nextToken } = action.meta.arg;
      if (nextToken) {
        state.loadingMore = true;
      } else {
        // New search: the newest request wins, older responses are dropped.
        state.queryKey = `${creatorsQueryKey(filter, sort)}#${action.meta.requestId}`;
        state.loading = true;
      }
      state.error = null;
      state.errorType = null;
    });
    builder.addCase(fetchCreators.fulfilled, (state, action) => {
      const { filter, sort, nextToken } = action.meta.arg;
      const key = creatorsQueryKey(filter, sort);
      const { items, nextToken: next, totalCount, stats } = action.payload;
      if (nextToken) {
        if (!state.queryKey?.startsWith(`${key}#`)) return; // filters changed meanwhile
        const seen = new Set(state.items.map((c) => c.id));
        state.items.push(...items.filter((c) => !seen.has(c.id)));
        state.loadingMore = false;
      } else {
        if (state.queryKey !== `${key}#${action.meta.requestId}`) return;
        state.items = items;
        state.totalCount = totalCount ?? null;
        state.stats = stats ?? null;
        state.loading = false;
      }
      state.nextToken = next ?? null;
      state.hasLoaded = true;
    });
    builder.addCase(fetchCreators.rejected, (state, action) => {
      const { filter, sort, nextToken } = action.meta.arg;
      const key = creatorsQueryKey(filter, sort);
      if (nextToken ? !state.queryKey?.startsWith(`${key}#`) : state.queryKey !== `${key}#${action.meta.requestId}`) {
        return;
      }
      state.loading = false;
      state.loadingMore = false;
      state.hasLoaded = true;
      const payload = action.payload as { message: string; type: string | null } | undefined;
      state.error = payload?.message || "Couldn't load creators";
      state.errorType = payload?.type ?? null;
    });
    builder.addCase(fetchFilterOptions.pending, (state) => {
      state.optionsLoading = true;
    });
    builder.addCase(fetchFilterOptions.fulfilled, (state, action) => {
      state.options = action.payload;
      state.optionsLoading = false;
    });
    builder.addCase(fetchFilterOptions.rejected, (state) => {
      state.optionsLoading = false;
    });
  },
});

export const { resetCreators } = creatorsSlice.actions;
export default creatorsSlice.reducer;
