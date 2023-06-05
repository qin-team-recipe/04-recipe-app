import { prisma } from "../database/prisma";
import { publicProcedure, router } from "./init-trpc";

const healthCheck = publicProcedure.query(() => ({ status: "Running" }));

const getUserCount = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.user.count();
});

export const appRouter = router({
  health: healthCheck,
  userCount: getUserCount,
});

export const trpcCaller = appRouter.createCaller({ user: undefined, prisma });

export type AppRouter = typeof appRouter;
