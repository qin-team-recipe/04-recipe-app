import { z } from "zod";

export const FollowChefInput = z.object({
  chefId: z.string(),
});

export const FavoriteRecipeInput = z.object({
  recipeId: z.string(),
});
