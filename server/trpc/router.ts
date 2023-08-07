import { prisma } from "../database/prisma";
import { mergeRouters, publicProcedure, router } from "./init-trpc";
import { chefRecipeRouter } from "../_chef-recipe/router";
import { authRouter } from "../_auth/router";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { followFavoriteRouter } from "../_follow-favorite/router";
import { myRecipeRouter } from "../_my-recipe/router";
import { shoppingListRouter } from "../_shopping-list/router";
import { mypageRouter } from "../_mypage/router";

const healthCheck = publicProcedure.query(() => ({ status: "Running" }));

export const appRouter = mergeRouters(
  router({ healthCheck }),
  chefRecipeRouter,
  authRouter,
  followFavoriteRouter,
  myRecipeRouter,
  mypageRouter,
  router({ shoppingList: shoppingListRouter })
);

export const trpcCaller = appRouter.createCaller({ user: undefined, prisma });

export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type RouteInput = inferRouterInputs<AppRouter>;
