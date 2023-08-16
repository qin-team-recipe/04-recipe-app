import { router } from "../trpc/init-trpc";
import { getMyRecipes } from "./get-myRecipes";
import { createMyRecipe } from "./create-my-recipe";

export const myRecipeRouter = router({
  myrecipes: getMyRecipes,
  regmyrecipe: createMyRecipe,
});
