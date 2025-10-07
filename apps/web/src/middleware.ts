import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";
import { StaticRoutes } from "./config/static-routes";

// Routes only accessible when NOT logged in
const authRoutes = [StaticRoutes.SIGN_IN];

// Routes only accessible when logged in
const protectedRoutes = [
  StaticRoutes.DASHBOARD,
  StaticRoutes.ACCOUNTS,
  StaticRoutes.MANAGE_USERS,
  StaticRoutes.MANAGE_PERMISSIONS,
  StaticRoutes.MANAGE_PROJECTS,
];

export default async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);
  const isProtectedRoute = protectedRoutes.includes(pathName);

  // If not a route we care about, allow access
  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for session cookie (lightweight check for redirection)
  // NOTE: This only checks cookie existence, NOT validity
  // Actual auth validation happens in each page/route via useAuthServer()
  const sessionCookie = getSessionCookie(request);

  // Not logged in (no session cookie)
  if (!sessionCookie) {
    if (isAuthRoute) {
      return NextResponse.next(); // Allow access to login page
    }

    if (isProtectedRoute) {
      return NextResponse.redirect(new URL(StaticRoutes.SIGN_IN, request.url));
    }

    return NextResponse.next();
  }

  // Has session cookie - redirect away from auth pages
  if (isAuthRoute) {
    return NextResponse.redirect(new URL(StaticRoutes.DASHBOARD, request.url));
  }

  // For protected routes, allow through
  // Role-based checks are handled in layout.tsx via useAuthServer()
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
