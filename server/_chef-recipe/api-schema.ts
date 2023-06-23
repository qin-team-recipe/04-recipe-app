import { z } from "zod";

export const ChefIdInput = z.object({
  chefId: z.string(),
});
