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
  title: z.string().nonempty({
    message: "レシピ名を入力してください。",
  }),
  links: z.array(
    z.object({
      value: z.string().url({ message: "URLを入力してください。" }).max(191, { message: "長すぎです" }),
    })
  ),
  servings: z
    .number()
    .int()
    .lte(6, { message: "6人以下で入力してください。" })
    .gte(2, { message: "2人以上で入力してください。" }),
  ingredients: customIngredientsSchema("ingredients"),
  description: z.string().max(1000, { message: "1000文字以下で入力してください。" }),
  image: z.custom<FileList>().transform((file) => file[0]),
  steps: customIngredientsSchema("steps"),
});
