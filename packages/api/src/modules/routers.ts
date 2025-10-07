import { protectedProcedure } from "../lib/orpc";
import { adminRouter } from "./admin/admin.router";
import { authService } from "./auth/auth.service";

export const appRouter = {
  admin: adminRouter,

  cleanupExpiredBans: protectedProcedure.handler(async () => {
    const unbannedCount = await authService.unbanExpiredUsers();
    return {
      success: true,
      unbannedUsers: unbannedCount,
    };
  }),
};
export type AppRouter = typeof appRouter;
