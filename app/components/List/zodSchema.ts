import { z } from "zod";

export const myMemoSchema = z.object({
  myMemoList: z.array(
    z.object({
      item: z.string().nonempty({ message: "メモを入力してください。" }),
      checked: z.boolean(),
    })
  ),
});

export type MyMemoSchema = z.infer<typeof myMemoSchema>;
