import { prisma } from "../database/prisma";
import { mergeRouters, publicProcedure, router } from "./init-trpc";
import { chefRecipeRouter } from "../_chef-recipe/router";
import { authRouter } from "../_auth/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { myRecipeRouter } from "../_my-recipe/router";

const healthCheck = publicProcedure.query(() => ({ status: "Running" }));

const getUserCount = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.user.count();
});

const testRouter = router({
  health: healthCheck,
  userCount: getUserCount,
});

export const appRouter = mergeRouters(testRouter, chefRecipeRouter, authRouter, myRecipeRouter);

export const trpcCaller = appRouter.createCaller({ user: undefined, prisma });

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouteInput = inferRouterInputs<AppRouter>;
