import { router } from "../trpc/init-trpc";
import {
  addAllIngredientsToList,
  addIngredientToList,
  appendShopListIngredient,
  deleteCheckedShopListIngredients,
  deleteShopListIngredient,
  deleteShopListRecipe,
  removeIngredientFromList,
  updateShopListIngredient,
} from "./shop-list-recipe";

export const shoppingListRouter = router({
  addAllIngredientsToList,
  addIngredientToList,
  removeIngredientFromList,
  updateShopListIngredient,
  deleteShopListIngredient,
  deleteShopListRecipe,
  deleteCheckedShopListIngredients,
  appendShopListIngredient,
});
