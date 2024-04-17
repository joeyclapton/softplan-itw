import NextAuth from "next-auth/next";
import { IUser } from "../interfaces/user";

declare module "next-auth" {
  interface Session {
    id?: number;
    isAdmin?: boolean;
    createdAt?: string;
    name: string;
    email: string;
    password: string;
    job: string;
    avatar: string;
  }
}
