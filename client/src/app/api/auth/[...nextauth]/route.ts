import LoginService from "@/app/shared/services/login";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        const url = "https://661d62bd98427bbbef01aea6.mockapi.io/api/v1/users";
        const response = await fetch(url, {
          method: "GET",
        });
        const users = await response.json();
        const userByLogin = users?.find((user) => {
          return user.email === credentials?.email || user.password === credentials?.password;
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
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
