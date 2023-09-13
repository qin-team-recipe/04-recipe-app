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
import { myMemoAddItem } from "./my-memo-add-item";
import { myMemoDeleteItem } from "./my-memo-delete-item";
import { myMemoUpdateItem } from "./my-memo-update-item";
import { myMemoDeleteCompleted } from "./my-memo-delete-completed";
import { myMemoDeleteAll } from "./my-memo-delete-all";
import { myMemoReorder } from "./my-memo-reorder";
import { myMemoGetItems } from "./my-memo-get-items";

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
  // 自分メモの操作
  myMemoItems: myMemoGetItems,
  myMemoAddItem,
  myMemoUpdateItem,
  myMemoDeleteItem,
  myMemoDeleteCompleted,
  myMemoDeleteAll,
  myMemoReorder,
});
