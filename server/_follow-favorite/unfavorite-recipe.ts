import { protectedProcedure } from "../trpc/init-trpc";
import { FavoriteRecipeInput } from "./api-schema";

/**
 * レシピのお気に入りを解除する
 */
export const unfavoriteRecipe = protectedProcedure.input(FavoriteRecipeInput).mutation(async ({ ctx, input }) => {
  const favorite = await ctx.prisma.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId: ctx.user.userId,
        recipeId: input.recipeId,
      },
    },
  });
  if (favorite !== null) {
    await ctx.prisma.favorite.delete({ where: { id: favorite.id } });
  }
});
