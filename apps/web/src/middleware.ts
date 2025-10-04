import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { StaticRoutes } from "./config/static-routes";

// Routes only accessible when NOT logged in
const authRoutes = [StaticRoutes.SIGN_IN];

// Routes only accessible when logged in
const protectedRoutes = [StaticRoutes.DASHBOARD];

// Routes only accessible when logged in and and user is admin

// TODO: Need to implement admin check and admin routes
const adminRoutes = ["/admin"];

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);

  const isProtectedRoute = protectedRoutes.includes(pathName);

  // If not a route we care about i.e public route, allow access
  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  // Check session only if route needs it
  const { data: session } = await betterFetch("/api/auth/get-session", {
    baseURL: process.env.BETTER_AUTH_URL,
    headers: {
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  // Not logged in
  if (!session) {
    if (isAuthRoute) {
      return NextResponse.next(); // Allow access to login page
    }

    if (isProtectedRoute) {
      return NextResponse.redirect(new URL(StaticRoutes.SIGN_IN, request.url));
    }

    return NextResponse.next();
  }

  // Logged in
  if (isAuthRoute) {
    return NextResponse.redirect(new URL(StaticRoutes.DASHBOARD, request.url));
  }

  return NextResponse.next(); // Allowed access to protected route
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
