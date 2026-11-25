import { NextRequest, NextResponse } from "next/server";
import { fetchAuthSession } from "aws-amplify/auth/server";
import { runWithAmplifyServerContext } from "@/lib/amplifyServerUtils";
import {
  DEFAULT_AUTHED_ROUTE,
  LOGIN_ROUTE,
  isProtectedRoute,
  isPublicRoute,
} from "@/config/routes";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { pathname, search } = request.nextUrl;

  const authenticated = await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return Boolean(session.tokens?.accessToken);
      } catch {
        return false;
      }
    },
  });

  if (isProtectedRoute(pathname) && !authenticated) {
    const url = new URL(LOGIN_ROUTE, request.url);
    url.searchParams.set("redirect", `${pathname}${search}`);
    return NextResponse.redirect(url);
  }

  if (isPublicRoute(pathname) && authenticated) {
    return NextResponse.redirect(new URL(DEFAULT_AUTHED_ROUTE, request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/forgot-password"],
};
