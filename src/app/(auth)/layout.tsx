import { ReactNode, Suspense } from "react";
import StoreProvider from "@/app/StoreProvider";
import GuestGuard from "@/components/guards/GuestGuard";
import PageLoader from "@/components/ui/PageLoader";

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <StoreProvider>
      <Suspense fallback={<PageLoader label="Checking your session" />}>
        <GuestGuard>{children}</GuestGuard>
      </Suspense>
    </StoreProvider>
  );
}
