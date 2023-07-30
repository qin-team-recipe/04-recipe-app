import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import { IngredientIdInput } from "./api-schema";
import { CreatedShopListRecipe } from "./shop-list-recipe-core";

/**
 * 材料を買い物リストから削除する
 */
export const removeIngredientFromList = protectedProcedure.input(IngredientIdInput).mutation(async ({ ctx, input }) => {
  // 材料が存在することを確認する
  const ingredient = await ctx.prisma.recipeIngredient.findUnique({ where: { id: input.ingredientId } });
  if (ingredient === null) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "IDに該当する材料が存在しません" });
  }

  const recipeInShopList: CreatedShopListRecipe | null = await ctx.prisma.shopListRecipe.findUnique({
    where: { userId_recipeId: { userId: ctx.user.userId, recipeId: ingredient.recipeId } },
    include: { shopListIngredients: true },
  });

  // 材料が買い物リストにない場合は何もしない
  if (recipeInShopList === null) {
    // 買い物リストにレシピそのものがない場合
    return;
  }
  const ingredientInShopList = recipeInShopList.shopListIngredients.find(
    (item) => item.recipeIngredientId === ingredient.id
  );
  if (ingredientInShopList === undefined) {
    // 買い物リストに材料が追加されていない場合
    return;
  }

  // 材料が買い物リストにある場合は削除する。買い物リストのレシピの材料が空になれば、買い物リストからレシピを削除する。
  await ctx.prisma.$transaction(async (tx) => {
    await tx.shopListIngredient.delete({ where: { id: ingredientInShopList.id } });

    if (recipeInShopList.shopListIngredients.length === 1) {
      await tx.shopListRecipe.delete({ where: { id: recipeInShopList.id } });
    }
  });
});
