import { z } from "zod";

export const listSchema = z.object({
  list: z.array(
    z.object({
      name: z.string().nonempty({ message: "メモを入力してください。" }),
      checked: z.boolean(),
    })
  ),
});

export type ListSchema = z.infer<typeof listSchema>;
