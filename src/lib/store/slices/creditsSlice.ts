import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getErrorMessage, myCreditsAPI } from "@/lib/graphql/handleApi";
import { CreditBalance, CreditCosts } from "@/lib/models/creator";
import { fetchCreators } from "./creatorsSlice";

export const DEFAULT_COSTS: CreditCosts = { advancedFilter: 2, revealEmail: 1, revealPhone: 2, openProfile: 1 };

interface CreditsState {
  balance: number;
  expiresAt: string | null;
  expired: boolean;
  costs: CreditCosts;
  loaded: boolean;
  loading: boolean;
}

const initialState: CreditsState = {
  balance: 0,
  expiresAt: null,
  expired: false,
  costs: DEFAULT_COSTS,
  loaded: false,
  loading: false,
};

export const fetchCredits = createAsyncThunk("credits/fetchCredits", async (_: void, { rejectWithValue }) => {
  try {
    return await myCreditsAPI();
  } catch (error) {
    return rejectWithValue(getErrorMessage(error, "Couldn't load credits"));
  }
});

const apply = (state: CreditsState, credits: CreditBalance) => {
  state.balance = credits.balance;
  state.expiresAt = credits.expiresAt ?? null;
  state.expired = credits.expired;
  state.costs = credits.costs;
  state.loaded = true;
};

const creditsSlice = createSlice({
  name: "credits",
  initialState,
  reducers: {
    setCredits: (state, action: PayloadAction<CreditBalance>) => apply(state, action.payload),
    resetCredits: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCredits.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCredits.fulfilled, (state, action) => {
      apply(state, action.payload);
      state.loading = false;
    });
    builder.addCase(fetchCredits.rejected, (state) => {
      state.loading = false;
    });
    // Advanced-filter searches return the updated balance.
    builder.addCase(fetchCreators.fulfilled, (state, action) => {
      if (action.payload.credits) apply(state, action.payload.credits);
    });
  },
});

export const { setCredits, resetCredits } = creditsSlice.actions;
export default creditsSlice.reducer;
