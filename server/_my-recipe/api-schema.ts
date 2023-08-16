import { z } from "zod";

export const UserIdInput = z.object({
  userId: z.string(),
});

export const createMyRecipeInput = z.object({
  //TODO文字数チェックを追加する
  name: z.string(),
  ingredients: z.array(z.string()),
  yields: z.number().max(6).min(1),
  processes: z.array(z.string()),
  images: z.array(z.string()),
  description: z.string().optional(),
  urls: z.array(z.string().url()),
});

export const updateMyRecipeInput = z.object({
  name: z.string(),
  ingredients: z.array(z.string()),
  yields: z.number().max(6).min(1),
  processes: z.array(z.string()),
  images: z.array(z.string()),
  description: z.string().optional(),
  urls: z.array(z.string().url()),
});
