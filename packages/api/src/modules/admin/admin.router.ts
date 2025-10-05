import { ORPCError } from "@orpc/client";
import { headers } from "next/headers";
import { z } from "zod";
import { protectedProcedure } from "../../lib/orpc";
import { auth } from "../auth/auth.adapter";
import { USER_ROLES } from "../auth/auth.constants";
import { authService } from "../auth/auth.service";

export const adminRouter = {
  getUsers: protectedProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        offset: z.number().optional(),
        searchValue: z.string().optional(),
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

      const data = await auth.api.listUsers({
        headers: await headers(),
        query: {
          limit: input.limit ?? 10,
          offset: input.offset ?? 0,
          searchValue: input.searchValue ?? "",
        },
      });

      return { users: data.users, total: data.total };
    }),
};
export type AppRouter = typeof adminRouter;
