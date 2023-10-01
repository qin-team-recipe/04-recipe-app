import { router } from "../trpc/init-trpc";
import { getChef } from "./get-chef";
import { getChefs } from "./get-chefs";
import { getGeneralChef } from "./get-general-chef";
import { getRecipe } from "./get-recipe";
import { getRecipes } from "./get-recipes";

export const chefRecipeRouter = router({
  chefs: getChefs,
  chef: getChef,
  recipes: getRecipes,
  recipe: getRecipe,
  generalChef: getGeneralChef,
});
