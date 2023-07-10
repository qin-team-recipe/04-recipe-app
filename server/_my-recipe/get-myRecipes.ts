import { publicProcedure } from "../trpc/init-trpc";
import { UserIdInput } from "./api-schema";

/**
 * 特定のユーザーのマイレシピ一覧を取得する
 */
export const getMyRecipes = publicProcedure.input(UserIdInput).query(async ({ ctx, input }) => {
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
  });
  return myRecipes;
});
