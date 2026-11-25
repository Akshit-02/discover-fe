import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { Amplify } from "aws-amplify";
import awsExports from "../../aws-export";
import storage from "./storage";
import userDetailsSlice from "./slices/userDetailsSlice";
import creatorsSlice from "./slices/creatorsSlice";
import listsSlice from "./slices/listsSlice";
import creditsSlice from "./slices/creditsSlice";

Amplify.configure(awsExports, { ssr: true });

const rootReducer = combineReducers({
  userDetails: userDetailsSlice,
  creators: creatorsSlice,
  lists: listsSlice,
  credits: creditsSlice,
});

const persistConfig = {
  key: "influencerDiscovery",
  storage,
  whitelist: ["userDetails"],
  version: 1,
  migrate: async (state: unknown) => {
    if (state && typeof state === "object" && "shortlist" in state) {
      const { shortlist: _removed, ...rest } = state as Record<string, unknown>;
      return rest as never;
    }
    return state as never;
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
