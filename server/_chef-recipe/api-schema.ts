import { z } from "zod";

export const ChefIdInput = z.object({
  chefId: z.string(),
});

export const SearchInput = z.object({
  search: z.string().optional(),
});

export const RecipeIdInput = z.object({
  recipeId: z.string(),
});

export const UserIdInput = z.object({
  userId: z.string(),
});

export const GetRecipesInput = SearchInput;
