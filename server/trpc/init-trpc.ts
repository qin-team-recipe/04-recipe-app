import { initTRPC } from "@trpc/server";
import { prisma } from "../database/prisma";

type AdminUser = { type: "admin" };
type GeneralUser = { type: "general"; id: string };
type User = AdminUser | GeneralUser;

export function createContext() {
  // TODO: authentication
  const user: User | undefined = undefined;

  return { user, prisma };
}

type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
