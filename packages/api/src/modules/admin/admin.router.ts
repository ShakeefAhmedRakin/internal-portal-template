import { ORPCError } from "@orpc/client";
import { z } from "zod";
import { protectedProcedure } from "../../lib/orpc";
import { USER_ROLES } from "../auth/auth.constants";
import { authService } from "../auth/auth.service";
import { adminService } from "./admin.service";

export const adminRouter = {
  getUsers: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        searchValue: z.string().optional(),
        roleFilter: z.string().optional(),
        bannedFilter: z.boolean().optional(),
        sortBy: z.enum(["name", "createdAt", "updatedAt"]).optional(),
        sortOrder: z.enum(["asc", "desc"]).optional(),
      })
    )
    .handler(async ({ context, input }) => {
      if (!context.session) {
        throw new ORPCError("UNAUTHORIZED");
      }

      if (
        !(await authService.hasMinimumRole(
          context.session.user.id,
          USER_ROLES.ADMIN
        ))
      ) {
        throw new ORPCError("UNAUTHORIZED");
      }

      const data = await adminService.listUsers({
        limit: input.limit ?? 10,
        offset: input.offset ?? 0,
        searchValue: input.searchValue ?? "",
        roleFilter: input.roleFilter,
        bannedFilter: input.bannedFilter,
        sortBy: input.sortBy ?? "createdAt",
        sortOrder: input.sortOrder ?? "desc",
      });

      return { users: data.users, total: data.total };
    }),
};
export type AdminRouter = typeof adminRouter;
