import { router } from "../trpc/init-trpc";
import { getShoppingList } from "./get-shopping-list";
import { addAllIngredientsToList } from "./add-all-ingredients-to-list";
import { addIngredientToList } from "./add-ingredient-to-list";
import { removeIngredientFromList } from "./remove-ingredient-from-list";
import { updateShopListIngredient } from "./update-shop-list-ingredient";
import { deleteShopListIngredient } from "./delete-shop-list-ingredient";
import { deleteShopListRecipe } from "./delete-shop-list-recipe";
import { deleteCheckedShopListIngredients } from "./delete-checked-shop-list-ingredients";
import { appendShopListIngredient } from "./append-shop-list-ingredient";

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
