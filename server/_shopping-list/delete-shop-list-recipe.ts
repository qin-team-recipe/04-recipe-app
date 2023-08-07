import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { ShopListRecipeIdInput } from "./api-schema";

/**
 * 買い物リストのレシピを削除する
 */
export const deleteShopListRecipe = protectedProcedure.input(ShopListRecipeIdInput).mutation(async ({ ctx, input }) => {
  const shopListRecipe = await ctx.prisma.shopListRecipe.findUnique({
    where: { id: input.shopListRecipeId },
  });
  if (shopListRecipe === null) {
    throw notFoundError;
  }
  if (shopListRecipe.userId !== ctx.user.userId) {
    throw notFoundError;
  }

  await ctx.prisma.$transaction(async (tx) => {
    // 買い物リストのレシピの材料を削除する
    await tx.shopListIngredient.deleteMany({
      where: { shopListRecipeId: input.shopListRecipeId },
    });
    // 買い物リストのレシピを削除する
    await tx.shopListRecipe.delete({ where: { id: input.shopListRecipeId } });
  });
});
