import { adminRouter } from "./admin/admin.router";

export const appRouter = {
  admin: adminRouter,
};
export type AppRouter = typeof appRouter;
