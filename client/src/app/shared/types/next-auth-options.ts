import UserService from "@/app/shared/services/users";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req): Promise<any> {
        const userService = new UserService();
        const users = await userService.getAll();
        const userByLogin = users?.find(({ email, password }) => {
          return email === credentials?.email && password === credentials?.password;
        });

        if (userByLogin) {
          return userByLogin;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);

      return token;
    },
    async session({ session, token }) {
      session = token.user as any;

      return session;
    },
  },
  secret: process.env.secret,
};

export default nextAuthOptions
