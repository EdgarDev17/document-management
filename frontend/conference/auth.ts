import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { apiClient } from "@/lib/api-service";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          // obtenemos el usuario de la base de datos
          const response = await apiClient.post("/sessions/signin", {
            email: credentials.email,
            password: credentials.password,
          });

          if (response && response.data) {
            console.log("Este es el usuario de la db:", response.data);
            return response.data;
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
    async jwt({ token, user, account, session }) {
      // Si el usuario es autenticado, añadir el token JWT al token de sesión
      if (user || account || session) {
        token.accessToken = user.token;
        token.userId = user.userID;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.userId = token.userId;
      return session;
    },
  },
});
