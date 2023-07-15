import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import { FavoriteRecipeInput } from "./api-schema";
import { validateRecipeId } from "./utils";

/**
 * レシピをお気に入りする
 */
export const favoriteRecipe = protectedProcedure.input(FavoriteRecipeInput).mutation(async ({ ctx, input }) => {
  const result = await validateRecipeId(ctx.prisma, input.recipeId);
  if (!result.success) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "レシピIDが正しくありません" });
  }

  const favorite = await ctx.prisma.favorite.findUnique({
    where: {
      userId_recipeId: {
        userId: ctx.user.userId,
        recipeId: input.recipeId,
      },
    },
  });
  if (favorite !== null) return favorite;

  return await ctx.prisma.favorite.create({
    data: {
      userId: ctx.user.userId,
      recipeId: input.recipeId,
    },
  });
});
