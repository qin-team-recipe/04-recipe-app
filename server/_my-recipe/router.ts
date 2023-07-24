import { router } from "../trpc/init-trpc";
import { getMyRecipes } from "./get-myRecipes";
import { registrationMyRecipe } from "./reg-myRecipe";

export const myRecipeRouter = router({
  myrecipes: getMyRecipes,
  regmyrecipe: registrationMyRecipe,
});
