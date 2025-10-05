// Server-side auth utilities - use in Server Components and API routes

import { auth } from "api";
import { USER_ROLES, type UserRole } from "api/src/modules/auth/auth.constants";
import { authService } from "api/src/modules/auth/auth.service";
import type { User } from "better-auth";
import { headers } from "next/headers";
import { StaticRoutes } from "../../config/static-routes";

// Server-side session utilities
export async function getServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

export async function getServerUser(): Promise<User | null> {
  const session = await getServerSession();
  return session?.user || null;
}

// Server-side role checking utilities
export async function hasRole(role: UserRole): Promise<boolean> {
  const user = await getServerUser();
  if (!user?.id) return false;

  try {
    const userRole = await authService.getUserRole(user.id);
    return userRole === role;
  } catch (error) {
    console.error("Error checking user role:", error);
    return false;
  }
}

export async function hasMinimumRole(minRole: UserRole): Promise<boolean> {
  const user = await getServerUser();
  if (!user?.id) return false;

  try {
    return await authService.hasMinimumRole(user.id, minRole);
  } catch (error) {
    console.error("Error checking minimum role:", error);
    return false;
  }
}

export async function isAdmin(): Promise<boolean> {
  return hasRole(USER_ROLES.ADMIN);
}

export async function isOperator(): Promise<boolean> {
  return hasRole(USER_ROLES.OPERATOR);
}

export async function isVisitor(): Promise<boolean> {
  return hasRole(USER_ROLES.VISITOR);
}

export async function getUserRole(): Promise<UserRole | null> {
  const user = await getServerUser();
  if (!user?.id) return null;

  try {
    return await authService.getUserRole(user.id);
  } catch (error) {
    console.error("Error getting user role:", error);
    return null;
  }
}

// Main server-side auth hook
export async function useAuthServer() {
  const user = await getServerUser();
  const userRole = await getUserRole();

  return {
    user,
    userRole,
    isAuthenticated: !!user,
    isAdmin: userRole === USER_ROLES.ADMIN,
    isOperator: userRole === USER_ROLES.OPERATOR,
    isVisitor: userRole === USER_ROLES.VISITOR,
  };
}

// Higher-order functions for role-based protection
export function withRoleCheck(requiredRole: UserRole, redirectTo?: string) {
  return async function roleProtectedHandler() {
    const hasRequiredRole = await hasMinimumRole(requiredRole);

    if (!hasRequiredRole) {
      throw new Error(`Access denied. Required role: ${requiredRole}`);
    }
  };
}

export function withAdminCheck(redirectTo?: string) {
  return withRoleCheck(USER_ROLES.ADMIN, redirectTo || StaticRoutes.SIGN_IN);
}

export function withOperatorCheck(redirectTo?: string) {
  return withRoleCheck(USER_ROLES.OPERATOR, redirectTo || StaticRoutes.SIGN_IN);
}

export function withVisitorCheck(redirectTo?: string) {
  return withRoleCheck(USER_ROLES.VISITOR, redirectTo || StaticRoutes.SIGN_IN);
}
