import { router } from "../trpc/init-trpc";
import { getChef } from "./get-chef";
import { getChefs } from "./get-chefs";
import { getRecipes } from "./get-recipes";

export const chefRecipeRouter = router({
  chefs: getChefs,
  chef: getChef,
  recipes: getRecipes,
});
