import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getErrorMessage, getUserByIdAPI, updateMyProfileAPI } from "@/lib/graphql/handleApi";
import { ProfileInput, User } from "@/lib/models/user";

interface UserDetailsState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailsState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "userDetails/fetchUser",
  async (id: string, { rejectWithValue }) => {
    try {
      return await getUserByIdAPI(id);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  },
);

export const updateProfile = createAsyncThunk(
  "userDetails/updateProfile",
  async (input: ProfileInput, { rejectWithValue }) => {
    try {
      return await updateMyProfileAPI(input);
    } catch (error) {
      return rejectWithValue(getErrorMessage(error, "Couldn't save your profile"));
    }
  },
);

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to load profile";
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { clearUser } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
