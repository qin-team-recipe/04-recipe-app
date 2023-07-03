import { z } from "zod";

export const ChefIdInput = z.object({
  chefId: z.string(),
});

export const RecipeIdInput = z.object({
  recipeId: z.string(),
});