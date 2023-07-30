import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { RecipeIdInput } from "./api-schema";
import { convertRecipeIngredientsForShopList } from "./shop-list-recipe-core";
import { findOrCreateShopListRecipe } from "./utils";

/**
 * 全ての材料を買い物リストに追加する
 */
export const addAllIngredientsToList = protectedProcedure.input(RecipeIdInput).mutation(async ({ ctx, input }) => {
  // レシピを取得する
  const recipe = await ctx.prisma.recipe.findUnique({
    where: { id: input.recipeId },
    include: { ingredients: true },
  });
  if (recipe === null) {
    throw notFoundError;
  }

  // レシピの材料を、買い物リストの中のレシピの材料に変換する
  const shopListIngredients = convertRecipeIngredientsForShopList(recipe.ingredients);

  // 買い物リストのレシピが存在しなければ作成する。それから、買い物リストの材料を追加する。
  await ctx.prisma.$transaction(async (tx) => {
    const shopListRecipe = await findOrCreateShopListRecipe({
      prisma: tx,
      userId: ctx.user.userId,
      recipeId: recipe.id,
    });

    // レシピの材料を、削除してから登録する
    await tx.shopListIngredient.deleteMany({
      where: { shopListRecipeId: shopListRecipe.id },
    });
    await tx.shopListIngredient.createMany({
      data: shopListIngredients.map((ingredient) => ({
        shopListRecipeId: shopListRecipe.id,
        recipeIngredientId: ingredient.recipeIngredientId,
        name: ingredient.name,
        isChecked: ingredient.isChecked,
        sortOrder: ingredient.sortOrder,
      })),
    });
  });
});
