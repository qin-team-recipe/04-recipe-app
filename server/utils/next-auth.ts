import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../database/prisma";
import { Adapter } from "next-auth/adapters";

export const nextAuthOptions = {
  // TODO: PrismaAdapterとnext-authのAdapterの型が違うのを修正する
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // 最初にトークンを作成するとき、ユーザーIDをトークンに保存する
        return { ...token, userId: user.id };
      }
      return token;
    },
    session({ session, token }) {
      if (token.userId === undefined) {
        throw new Error("User id is not set to token");
      }

      const newSession = {
        ...session,
        user: {
          ...session.user,
          userId: token.userId,
        },
      };

      return newSession;
    },
  },
} satisfies AuthOptions;

export const nextAuthHandler = NextAuth(nextAuthOptions);
