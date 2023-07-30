import { router } from "../trpc/init-trpc";
import { getShoppingList } from "./get-shopping-list";
import {
  appendShopListIngredient,
  deleteCheckedShopListIngredients,
  deleteShopListIngredient,
  deleteShopListRecipe,
  updateShopListIngredient,
} from "./shop-list-recipe";
import { addAllIngredientsToList } from "./add-all-ingredients-to-list";
import { addIngredientToList } from "./add-ingredient-to-list";
import { removeIngredientFromList } from "./remove-ingredient-from-list";

export const shoppingListRouter = router({
  // レシピ詳細画面の操作
  addAllIngredientsToList,
  addIngredientToList,
  removeIngredientFromList,
  // 買い物リスト画面の操作
  shoppingList: getShoppingList,
  updateShopListIngredient,
  deleteShopListIngredient,
  deleteShopListRecipe,
  deleteCheckedShopListIngredients,
  appendShopListIngredient,
});
