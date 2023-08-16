import { PrismaClient } from "@prisma/client";
import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { RecipeIdInput } from "./api-schema";
import { getRecipeImageUrlFromImages } from "./recipe-util";

/**
 * レシピの材料のうち、買い物リストに含まれるもののIDを取得する
 */
async function getIngredientIds(prisma: PrismaClient, userId: string, ingredientIds: number[]): Promise<number[]> {
  // 買い物リストの材料を検索する
  const ingredients = await prisma.shopListIngredient.findMany({
    where: {
      recipeIngredientId: { in: ingredientIds },
      shopListRecipe: { userId },
    },
  });

  return ingredients.map((ingredient) => {
    // numberのIDで検索した結果なので、nullになることはない（TODO: アサーション）
    return ingredient.recipeIngredientId as number;
  });
}

/**
 * レシピの情報を取得する
 */
export const getRecipe = publicProcedure.input(RecipeIdInput).query(async ({ ctx, input }) => {
  const recipe = await ctx.prisma.recipe.findUnique({
    where: { id: input.recipeId },
    select: {
      id: true,
      name: true,
      description: true,
      yields: true,
      chefRecipe: {
        select: {
          chef: true,
        },
      },
      myRecipe: {
        select: {
          user: true,
        },
      },
      _count: { select: { favorites: true } },
      images: true,
      ingredients: true,
      processes: true,
      links: true,
    },
  });
  if (recipe === null) throw notFoundError;

  // ログインユーザーがお気に入りしているかどうか
  const isFavoriting =
    ctx.user === undefined
      ? false
      : (await ctx.prisma.favorite.findUnique({
          where: { userId_recipeId: { userId: ctx.user.userId, recipeId: input.recipeId } },
        })) !== null;

  // 買い物リストに含まれているかのフィールドを追加する
  const ingredientIdSet = ctx.user
    ? new Set<number>(
        await getIngredientIds(
          ctx.prisma,
          ctx.user.userId,
          recipe.ingredients.map((ingredient) => ingredient.id)
        )
      )
    : new Set<number>();
  const ingredients = recipe.ingredients.map((ingredient) => ({
    ...ingredient,
    isAddedToList: ingredientIdSet.has(ingredient.id),
  }));

  return {
    ...recipe,
    ingredients,
    isFavoriting,
    primaryImageUrl: getRecipeImageUrlFromImages(recipe.images),
  };
});
