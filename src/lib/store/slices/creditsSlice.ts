import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getErrorMessage, myCreditsAPI } from "@/lib/graphql/handleApi";
import { CreditBalance, CreditCosts } from "@/lib/models/creator";
import { fetchCreators } from "./creatorsSlice";

export const DEFAULT_COSTS: CreditCosts = { advancedFilter: 2, revealEmail: 1, revealPhone: 2, openProfile: 1 };

export interface PurchaseCelebration {
  packName: string;
  creditsAdded: number;
  amountInr: number;
  paymentId: string;
  balance: number;
}

interface CreditsState {
  balance: number;
  freeBalance: number;
  paidBalance: number;
  expiresAt: string | null;
  expired: boolean;
  costs: CreditCosts;
  loaded: boolean;
  loading: boolean;
  /** Buy-credits modal, opened from anywhere in the dashboard. */
  buyOpen: boolean;
  /** Set after a successful purchase to show the celebration screen. */
  celebration: PurchaseCelebration | null;
}

const initialState: CreditsState = {
  balance: 0,
  freeBalance: 0,
  paidBalance: 0,
  expiresAt: null,
  expired: false,
  costs: DEFAULT_COSTS,
  loaded: false,
  loading: false,
  buyOpen: false,
  celebration: null,
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
  state.freeBalance = credits.freeBalance ?? credits.balance;
  state.paidBalance = credits.paidBalance ?? 0;
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
    openBuyCredits: (state) => {
      state.buyOpen = true;
    },
    closeBuyCredits: (state) => {
      state.buyOpen = false;
    },
    celebratePurchase: (state, action: PayloadAction<PurchaseCelebration>) => {
      state.buyOpen = false;
      state.celebration = action.payload;
    },
    closeCelebration: (state) => {
      state.celebration = null;
    },
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

export const { setCredits, resetCredits, openBuyCredits, closeBuyCredits, celebratePurchase, closeCelebration } =
  creditsSlice.actions;
export default creditsSlice.reducer;
