"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import PageLoader from "@/components/ui/PageLoader";
import { ToastProvider } from "@/components/ui/Toaster";
import { persistor, store } from "@/lib/store/store";

const StoreProvider = ({ children }: { children: ReactNode }) => (
  <Provider store={store}>
    <PersistGate loading={<PageLoader label="Getting things ready" />} persistor={persistor}>
      <ToastProvider>{children}</ToastProvider>
    </PersistGate>
  </Provider>
);

export default StoreProvider;
