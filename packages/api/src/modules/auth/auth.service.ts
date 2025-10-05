import { eq } from "drizzle-orm";
import { db } from "../../lib/db";
import { ROLE_HIERARCHY, USER_ROLES, UserRole } from "./auth.constants";
import { user as userTable } from "./auth.schema";

class AuthService {
  async getUserRole(userId: string): Promise<UserRole> {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId));

    if (!user) {
      throw new Error("User not found");
    }

    return user.role;
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const user = await this.getUserRole(userId);
    return user === USER_ROLES.ADMIN;
  }

  async isUserOperator(userId: string): Promise<boolean> {
    const user = await this.getUserRole(userId);
    return user === USER_ROLES.OPERATOR;
  }

  async isUserVisitor(userId: string): Promise<boolean> {
    const user = await this.getUserRole(userId);
    return user === USER_ROLES.VISITOR;
  }

  async hasMinimumRole(userId: string, minRole: UserRole): Promise<boolean> {
    const userRole = await this.getUserRole(userId);
    const userRoleLevel = ROLE_HIERARCHY[userRole];
    const minRoleLevel = ROLE_HIERARCHY[minRole];
    return userRoleLevel >= minRoleLevel;
  }
}

export const authService = new AuthService();
