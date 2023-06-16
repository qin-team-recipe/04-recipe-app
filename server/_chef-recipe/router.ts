import { router } from "../trpc/init-trpc";
import { getChefs } from "./get-chefs";

export const chefRecipeRouter = router({
  chefs: getChefs,
});
