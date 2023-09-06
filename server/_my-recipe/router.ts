import { router } from "../trpc/init-trpc";
import { getMyRecipes } from "./get-myRecipes";
import { createMyRecipe } from "./create-my-recipe";
import { updateMyRecipe } from "./update-my-recipe";

export const myRecipeRouter = router({
  myRecipes: getMyRecipes,
  regmyrecipe: createMyRecipe,
  updatemyrecipe: updateMyRecipe,
});
