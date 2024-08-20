import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/account/login",
  },
  secret: process.env.AUTH_SECRET,
  providers: [],
} satisfies NextAuthConfig;
