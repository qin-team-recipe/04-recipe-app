import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { ShopListIngredientIdInput } from "./api-schema";

/**
 * 買い物リストの材料を削除する
 */
export const deleteShopListIngredient = protectedProcedure
  .input(ShopListIngredientIdInput)
  .mutation(async ({ ctx, input }) => {
    const shopListIngredient = await ctx.prisma.shopListIngredient.findUnique({
      where: { id: input.shopListIngredientId },
      select: {
        id: true,
        shopListRecipeId: true,
      },
    });
    if (shopListIngredient === null) throw notFoundError;

    // 買い物リストの材料を削除する。買い物リストのレシピから材料がなくなる場合は、レシピも削除する。
    await ctx.prisma.$transaction(async (tx) => {
      const shopListRecipe = await tx.shopListRecipe.findUniqueOrThrow({
        where: { id: shopListIngredient.shopListRecipeId },
        select: { id: true, shopListIngredients: true },
      });

      await tx.shopListIngredient.delete({ where: { id: shopListIngredient.id } });
      if (shopListRecipe.shopListIngredients.length === 1) {
        await tx.shopListRecipe.delete({ where: { id: shopListRecipe.id } });
      }
    });
  });
