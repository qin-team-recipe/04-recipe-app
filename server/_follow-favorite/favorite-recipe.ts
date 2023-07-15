import { protectedProcedure } from "../trpc/init-trpc";
import { FavoriteRecipeInput } from "./api-schema";

/**
 * レシピをお気に入りする
 */
export const favoriteRecipe = protectedProcedure.input(FavoriteRecipeInput).mutation(async ({ ctx, input }) => {
  const favorite = await ctx.prisma.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId: ctx.user.userId,
        recipeId: input.recipeId,
      },
    },
  });
  if (favorite === null) {
    await ctx.prisma.favorite.create({
      data: {
        userId: ctx.user.userId,
        recipeId: input.recipeId,
      },
    });
  }
});
