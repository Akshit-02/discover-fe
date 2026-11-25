"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { LOGIN_ROUTE } from "@/config/routes";
import { useAppDispatch } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/slices/userDetailsSlice";
import { resetCreators } from "@/lib/store/slices/creatorsSlice";
import { resetLists } from "@/lib/store/slices/listsSlice";
import { resetCredits } from "@/lib/store/slices/creditsSlice";

export const useSignOut = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = useCallback(async () => {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      dispatch(clearUser());
      dispatch(resetCreators());
      dispatch(resetLists());
      dispatch(resetCredits());
      router.replace(LOGIN_ROUTE);
    }
  }, [dispatch, router]);

  return { signOut: handleSignOut, signingOut };
};
