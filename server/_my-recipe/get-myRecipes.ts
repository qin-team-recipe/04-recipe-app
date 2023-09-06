import { Prisma } from "@prisma/client";
import { publicProcedure } from "../trpc/init-trpc";
import { GetMyRecipesInput } from "./api-schema";

function calculateOrderBy(sortBy: "latest" | "populality" | undefined): Prisma.RecipeFindManyArgs["orderBy"] {
  if (sortBy === "populality") {
    return {
      favorites: { _count: "desc" },
    };
  }
  return { id: "desc" };
}

/**
 * 特定のユーザーのマイレシピ一覧を取得する
 */
export const getMyRecipes = publicProcedure.input(GetMyRecipesInput).query(async ({ ctx, input }) => {
  const myRecipes = await ctx.prisma.recipe.findMany({
    where: {
      myRecipe: {
        userId: input.userId,
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      _count: { select: { favorites: true } },
    },
    orderBy: calculateOrderBy(input.sortBy),
  });
  return myRecipes;
});
