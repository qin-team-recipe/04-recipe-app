import { protectedProcedure } from "../trpc/init-trpc";

type ShopListIngredientResponse = {
  id: string;
  recipeIngredientId: number | null;
  name: string;
  isChecked: boolean;
};

type ShopListRecipeResponse = {
  id: string;
  recipe: {
    id: string;
    name: string;
  };
  shopListIngredients: ShopListIngredientResponse[];
};

type ShopListResponse = {
  // TODO: 自分メモ
  recipes: ShopListRecipeResponse[];
};

/**
 * 買い物リストを取得する
 */
export const getShoppingList = protectedProcedure.query(async ({ ctx, input }): Promise<ShopListResponse> => {
  // 買い物リストのレシピを取得する
  const recipes: ShopListRecipeResponse[] = await ctx.prisma.shopListRecipe.findMany({
    where: { userId: ctx.user.userId },
    select: {
      id: true,
      recipe: { select: { id: true, name: true } },
      shopListIngredients: { select: { id: true, recipeIngredientId: true, name: true, isChecked: true } },
    },
  });

  return { recipes };
});
