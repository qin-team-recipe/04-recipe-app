import { z } from "zod";

export const listSchema = z.object({
  list: z.array(
    z.object({
      name: z.string().nonempty({ message: "メモを入力してください。" }),
      checked: z.boolean(),
      shopListIngredientId: z.string(),
    })
  ),
});

export const myMemoListSchema = z.object({
  list: z.array(
    z.object({
      name: z.string().nonempty({ message: "メモを入力してください。" }),
      checked: z.boolean(),
      myMemoItemId: z.string(),
    })
  ),
});

export type ListSchema = z.infer<typeof listSchema>;
export type MyMemoListSchema = z.infer<typeof myMemoListSchema>;
