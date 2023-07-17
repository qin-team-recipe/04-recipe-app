import { router } from "../trpc/init-trpc";
import { getMyRecipes } from "./get-myRecipes";

export const myRecipeRouter = router({
  myrecipes: getMyRecipes,
});
