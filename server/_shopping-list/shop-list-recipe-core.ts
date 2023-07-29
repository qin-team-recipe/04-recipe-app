/**
 * 買い物リストのレシピ
 */
export type ShopListRecipe = {
  // id: string
  userId: string;
  recipeId: string;
  shopListIngredients: ShopListIngredient[];
};

/**
 * 買い物リストのレシピの材料
 */
export type ShopListIngredient = {
  shopListRecipeId: string;
  /**
   * レシピの材料（RecipeIngredient）のID
   */
  recipeIngredientId: number | null;
  /**
   * 材料名
   */
  name: string;
  /**
   * チェックされているかどうか
   */
  isChecked: boolean;
  /**
   * ソート順
   */
  sortOrder: number;
};

/**
 * 買い物リストのレシピの材料
 */
type UnprocessedShopListIngredient = Pick<ShopListIngredient, "recipeIngredientId" | "name">;

/**
 * 買い物リストのレシピに、材料を追加する
 *
 * @param shopListRecipe 買い物リストのレシピ
 * @param ingredient
 * @returns 新しくDBに登録する材料（すでに登録されている場合はnull←Resultで何か返したほうがいいかも）
 */
export function addIngredientToList(
  shopListRecipe: ShopListRecipe,
  ingredient: UnprocessedShopListIngredient
): ShopListIngredient | null {
  if (
    ingredient.recipeIngredientId !== null &&
    shopListRecipe.shopListIngredients.find((item) => item.recipeIngredientId === ingredient.recipeIngredientId)
  ) {
    return null;
  }

  return {
    ...ingredient,
    isChecked: false,
    shopListRecipeId: shopListRecipe.recipeId,
    sortOrder: Math.max(...shopListRecipe.shopListIngredients.map((ingredient) => ingredient.sortOrder)) + 1,
  };
}
