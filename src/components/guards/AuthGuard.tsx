"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { Hub } from "aws-amplify/utils";
import PageLoader from "@/components/ui/PageLoader";
import { LOGIN_ROUTE } from "@/config/routes";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearUser, fetchUser } from "@/lib/store/slices/userDetailsSlice";
import { resetCreators } from "@/lib/store/slices/creatorsSlice";
import { resetLists } from "@/lib/store/slices/listsSlice";
import { fetchCredits, resetCredits } from "@/lib/store/slices/creditsSlice";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userDetails.user);
  const [userId, setUserId] = useState<string | null>(null);

  const kickOut = useCallback(() => {
    dispatch(clearUser());
    dispatch(resetCreators());
    dispatch(resetLists());
    dispatch(resetCredits());
    router.replace(`${LOGIN_ROUTE}?redirect=${encodeURIComponent(pathname)}`);
  }, [dispatch, pathname, router]);

  useEffect(() => {
    let active = true;
    getCurrentUser()
      .then((current) => active && setUserId(current.userId))
      .catch(() => active && kickOut());
    return () => {
      active = false;
    };
  }, [kickOut]);

  useEffect(() => {
    if (userId && user?.id !== userId) dispatch(fetchUser(userId));
  }, [dispatch, user?.id, userId]);

  useEffect(() => {
    if (userId) dispatch(fetchCredits());
  }, [dispatch, userId]);

  useEffect(
    () =>
      Hub.listen("auth", ({ payload }) => {
        if (payload.event === "signedOut" || payload.event === "tokenRefresh_failure") {
          kickOut();
        }
      }),
    [kickOut],
  );

  if (!userId) return <PageLoader />;
  return <>{children}</>;
};

export default AuthGuard;
