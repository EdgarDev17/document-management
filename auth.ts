import NextAuth, { DefaultSession } from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "@/lib/api-service";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await apiClient.post("/sessions/signin", {
            email: credentials.email,
            password: credentials.password,
          });
          if (response && response.data) {
            return response.data as any; // Casting to any here, but we'll type it properly in callbacks
          }
          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userId = user.userID;
      }
      return token;
    },
    async session({
      session,
      token,
    }): Promise<DefaultSession & { accessToken?: string; userId?: string }> {
      return {
        ...session,
        accessToken: token.accessToken,
        userId: token.userId,
      };
    },
  },
});
