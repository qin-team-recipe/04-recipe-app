import { z } from "zod";

const ERROR_REQUIRE = "必須項目です";
const ERROR_MAX_LENGTH = "191文字以内で入力してください";
const ERROR_INVALID_URL = "有効なURLを入力してください";

// プロフィール設定スキーマ
export const profileFormSchema = z.object({
  nickname: z.string().min(1, { message: ERROR_REQUIRE }),
  biography: z.string().max(191, { message: ERROR_MAX_LENGTH }).optional(),
  multiInputItems: z.array(
    z.object({
      value: z.string().url({ message: ERROR_INVALID_URL }).max(191, { message: ERROR_MAX_LENGTH }),
    })
  ),
});

export type TProfileFormSchema = z.infer<typeof profileFormSchema>;

// 材料設定スキーマ
export const ingredientFormSchema = z.object({
  recipeName: z.string().min(1, { message: ERROR_REQUIRE }),
  description: z.string().max(191, { message: ERROR_MAX_LENGTH }).optional(),
  multiInputItems: z.array(
    z.object({
      value: z.string().min(1, { message: ERROR_REQUIRE }).max(191, { message: ERROR_MAX_LENGTH }),
    })
  ),
});

export type TIngredientFormSchema = z.infer<typeof ingredientFormSchema>;
