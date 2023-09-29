import { z } from "zod";

export const UserIdInput = z.object({
  userId: z.string(),
});

export const createMyRecipeInput = z.object({
  name: z.string(),
  ingredients: z.array(z.string()),
  yields: z.number().max(6).min(1),
  processes: z.array(z.string()),
  images: z.array(z.string()).optional(),
  description: z.string().optional(),
  urls: z.array(z.string().url()).optional(),
});

export const updateMyRecipeInput = z.object({
  recipeid: z.string(),
  name: z.string(),
  ingredients: z.array(z.string()),
  yields: z.number().max(6).min(1),
  processes: z.array(z.string()),
  images: z.array(z.string()).optional(),
  description: z.string().optional(),
  urls: z.array(z.string().url()).optional(),
});

export const deleteMyRecipeInput = z.object({
  myRecipeId: z.string(),
});
