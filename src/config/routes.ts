export const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password"];
export const DEFAULT_AUTHED_ROUTE = "/dashboard/discover";
export const LOGIN_ROUTE = "/login";

export const isPublicRoute = (pathname: string) =>
  PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

export const isProtectedRoute = (pathname: string) =>
  pathname.startsWith("/dashboard");

export const safeRedirect = (target: string | null) =>
  target && target.startsWith("/dashboard") ? target : DEFAULT_AUTHED_ROUTE;
