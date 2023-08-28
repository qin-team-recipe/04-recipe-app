import { z } from "zod";

const customIngredientsSchema = (field: "ingredients" | "steps") => {
  return z
    .array(
      // フィールドが存在していることをチェック
      z.object({
        value: z.string().nonempty({
          message:
            field == "ingredients"
              ? "材料名を入力してください。"
              : field == "steps"
              ? "作り方を入力してください。"
              : "",
        }),
      })
    )
    .refine((val) => val.length >= 1, {
      message: field == "ingredients" ? "材料は一つ以上必要です" : field == "steps" ? "作り方は一つ以上必要です" : "",
      path: [0, "value"],
    });
};

export const recipeSchema = z.object({
  name: z.string().nonempty({
    message: "レシピ名を入力してください。",
  }),
  ingredients: customIngredientsSchema("ingredients"),
  yields: z
    .number()
    .int()
    .min(1, { message: "1人以上で入力してください。" })
    .max(6, { message: "6人以下で入力してください。" }),
  processes: customIngredientsSchema("steps"),
  image: z
    .custom<FileList>()
    .transform((file) => file[0])
    .optional(),
  description: z.string().max(1000, { message: "1000文字以下で入力してください。" }).optional(),
  urls: z.array(
    z.object({
      value: z.string().url({ message: "URLを入力してください。" }).max(191, { message: "長すぎです" }).optional(),
    })
  ),
});

export type CreateRecipeSchema = z.infer<typeof recipeSchema>;
