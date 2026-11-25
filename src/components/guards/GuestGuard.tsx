"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import PageLoader from "@/components/ui/PageLoader";
import { safeRedirect } from "@/config/routes";

const GuestGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then(() => router.replace(safeRedirect(searchParams.get("redirect"))))
      .catch(() => active && setChecked(true));
    return () => {
      active = false;
    };
  }, [router, searchParams]);

  if (!checked) return <PageLoader label="Checking your session" />;
  return <>{children}</>;
};

export default GuestGuard;
