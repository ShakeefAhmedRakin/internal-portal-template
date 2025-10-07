import { auth } from "api";
import {
  ROLE_HIERARCHY,
  USER_ROLES,
  type UserRole,
} from "api/src/modules/auth/auth.constants";
import { headers } from "next/headers";
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

// Route permissions mapping (minimum role required)
const routePermissions: Record<string, UserRole> = {
  [StaticRoutes.MANAGE_USERS]: USER_ROLES.ADMIN,
  [StaticRoutes.MANAGE_PERMISSIONS]: USER_ROLES.ADMIN,
  [StaticRoutes.MANAGE_PROJECTS]: USER_ROLES.OPERATOR,
};

// Helper to check if user has minimum role required
function hasMinimumRole(userRole: UserRole, requiredRole: UserRole): boolean {
  const userLevel = ROLE_HIERARCHY[userRole];
  const requiredLevel = ROLE_HIERARCHY[requiredRole];
  return userLevel >= requiredLevel;
}

export default async function authMiddleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;

  const isAuthRoute = authRoutes.includes(pathName);
  const isProtectedRoute = protectedRoutes.includes(pathName);

  // If not a route we care about, allow access
  if (!isAuthRoute && !isProtectedRoute) {
    return NextResponse.next();
  }

  // Get session using auth.api (Next.js 15.2.0+ with Node.js runtime)
  const session = await auth.api.getSession({
    headers: await headers(),
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

  // Check role-based permissions for protected routes
  if (isProtectedRoute) {
    const requiredRole = routePermissions[pathName];

    if (requiredRole) {
      const userRole = session.user?.role as UserRole;

      if (!userRole || !hasMinimumRole(userRole, requiredRole)) {
        // User doesn't have sufficient permissions
        return NextResponse.redirect(
          new URL(StaticRoutes.DASHBOARD, request.url)
        );
      }
    }
  }

  return NextResponse.next(); // Allowed access to protected route
}

export const config = {
  runtime: "nodejs", // Required for Next.js 15.2.0+ to use auth.api in middleware
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
