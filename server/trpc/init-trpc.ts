import { initTRPC } from "@trpc/server";
import { getServerSession } from "next-auth";
import { authenticationError } from "./trpc-error";
import { prisma } from "../database/prisma";
import { nextAuthOptions } from "../utils/next-auth";

export type AdminUser = { type: "admin" };
export type GeneralUser = { type: "general"; id: string };
export type User = AdminUser | GeneralUser;

export async function createContext() {
  const session = await getServerSession(nextAuthOptions);

  return { user: session?.user, prisma };
}

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;

const isLoggedIn = middleware(async ({ ctx, next }) => {
  if (ctx.user === undefined) {
    throw authenticationError;
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

/**
 * ログインなしで使えるプロシージャ
 */
export const publicProcedure = t.procedure;

/**
 * ログインが必要なプロシージャ
 */
export const protectedProcedure = t.procedure.use(isLoggedIn);
