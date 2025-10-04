import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { db } from "../../lib/db";
import * as schema from "./auth.schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [process.env.CORS_ORIGIN || ""],
  emailAndPassword: {
    enabled: true,
    // Reset password functionality removed - admin-controlled system
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    admin({
      // Default role for users
      defaultRole: "user",
      // Roles for admins ( string to check against user.role)
      adminRoles: ["admin"],
      // User IDs for admins ( string to check against user.id)
      adminUserIds: [],
      // Default ban expires in ( milliseconds, default is 1 day)
      defaultBanExpiresIn: 60 * 60 * 24,
    }),
  ],
});
