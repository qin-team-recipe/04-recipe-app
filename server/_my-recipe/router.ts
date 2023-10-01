import { router } from "../trpc/init-trpc";
import { getMyRecipes } from "./get-myRecipes";
import { createMyRecipe } from "./create-my-recipe";
import { updateMyRecipe } from "./update-my-recipe";
import { deleteMyRecipe } from "./delete-my-recipe";

export const myRecipeRouter = router({
  myrecipes: getMyRecipes,
  regmyrecipe: createMyRecipe,
  updatemyrecipe: updateMyRecipe,
  deleteMyRecipe: deleteMyRecipe,
});
