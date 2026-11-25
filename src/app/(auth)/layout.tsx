import { ReactNode, Suspense } from "react";
import GuestGuard from "@/components/guards/GuestGuard";
import PageLoader from "@/components/ui/PageLoader";

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={<PageLoader label="Checking your session" />}>
      <GuestGuard>{children}</GuestGuard>
    </Suspense>
  );
}
