import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import { IngredientIdInput } from "./api-schema";
import { addIngredientToList as addIngredientToListCore } from "./shop-list-recipe-core";
import { findOrCreateShopListRecipe } from "./utils";

/**
 * 材料を買い物リストに追加する
 */
export const addIngredientToList = protectedProcedure.input(IngredientIdInput).mutation(async ({ ctx, input }) => {
  // 材料が存在することを確認する
  const ingredient = await ctx.prisma.recipeIngredient.findUnique({ where: { id: input.ingredientId } });
  if (ingredient === null) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "IDに該当する材料が存在しません" });
  }

  await ctx.prisma.$transaction(async (tx) => {
    // 買い物リストのレシピを、存在しなければ作成する
    const shopListRecipe = await findOrCreateShopListRecipe({
      prisma: tx,
      userId: ctx.user.userId,
      recipeId: ingredient.recipeId,
    });

    // 買い物リストの材料を、追加されていなければ追加する
    const newIngredient = addIngredientToListCore(shopListRecipe, {
      name: ingredient.title,
      recipeIngredientId: ingredient.id,
    });

    if (newIngredient !== null) {
      await tx.shopListIngredient.create({
        data: {
          shopListRecipeId: shopListRecipe.id,
          recipeIngredientId: newIngredient.recipeIngredientId,
          name: newIngredient.name,
          isChecked: newIngredient.isChecked,
          sortOrder: newIngredient.sortOrder,
        },
      });
    }
  });
});
