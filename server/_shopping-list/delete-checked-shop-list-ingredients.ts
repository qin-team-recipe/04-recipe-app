import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { ShopListRecipeIdInput } from "./api-schema";

/**
 * 買い物リストのレシピの材料のうち、チェックしたものを削除する
 */
export const deleteCheckedShopListIngredients = protectedProcedure
  .input(ShopListRecipeIdInput)
  .mutation(async ({ ctx, input }) => {
    const shopListRecipe = await ctx.prisma.shopListRecipe.findUnique({ where: { id: input.shopListRecipeId } });
    if (shopListRecipe === null) {
      throw notFoundError;
    }
    if (shopListRecipe.userId !== ctx.user.userId) {
      throw notFoundError;
    }

    const result = await ctx.prisma.shopListIngredient.deleteMany({
      where: {
        shopListRecipeId: shopListRecipe.id,
        isChecked: true,
      },
    });
    return { deletedCount: result.count };
  });
