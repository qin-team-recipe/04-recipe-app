import { z } from "zod";

export const ChefIdInput = z.object({
  chefId: z.string(),
});

export const SearchInput = z.object({
  search: z.string().optional(),
});
