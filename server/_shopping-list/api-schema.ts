import { z } from "zod";

/**
 * レシピ（Recipe）のID
 */
export const RecipeIdInput = z.object({
  recipeId: z.string(),
});

/**
 * レシピの材料（RecipeIngredient）のID
 */
export const IngredientIdInput = z.object({
  ingredientId: z.number(),
});

/**
 * 買い物リストのレシピの材料（ShopListIngredient）のID
 */
export const ShopListIngredientIdInput = z.object({
  shopListIngredientId: z.string(),
});

export const UpdateShopListIngredientInput = ShopListIngredientIdInput.merge(
  z.object({
    isChecked: z.boolean().optional(),
    name: z.string().optional(),
  })
);

/**
 * 買い物リストのレシピ（ShopListRecipe）のID
 */
export const ShopListRecipeIdInput = z.object({
  shopListRecipeId: z.string(),
});

export const AppendShopListIngredientInput = ShopListRecipeIdInput.merge(
  z.object({
    name: z.string(),
  })
);

export const MyMemoContent = z.string().max(191);

export const MyMemoItemIdInput = z.object({
  myMemoItemId: z.string(),
});

export const UpdateMyMemoItemInput = MyMemoItemIdInput.merge(
  z.object({
    isChecked: z.boolean().optional(),
    content: MyMemoContent.optional(),
  })
);

export const ReorderMyMemoInput = z.object({
  /** 移動元の要素のID */
  sourceItemId: z.string(),
  /** 移動先の要素のID */
  targetItemId: z.string(),
});
