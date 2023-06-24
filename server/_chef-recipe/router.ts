import { router } from "../trpc/init-trpc";
import { getChefs } from "./get-chefs";
import { getRecipes } from "./get-recipes";

export const chefRecipeRouter = router({
  chefs: getChefs,
  recipes: getRecipes,
});
