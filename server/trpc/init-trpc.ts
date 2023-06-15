import { initTRPC } from "@trpc/server";
import { prisma } from "../database/prisma";

export type AdminUser = { type: "admin" };
export type GeneralUser = { type: "general"; id: string };
export type User = AdminUser | GeneralUser;

export function createContext() {
  // TODO: authentication
  const user: User | undefined = undefined;

  return { user, prisma };
}

type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
