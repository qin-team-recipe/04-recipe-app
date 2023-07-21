"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LinkInput from "./linkInput";
import NameInput from "./nameInput";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./descriptionInput";
import ImageInput from "./imageIput";
import StepsInput from "./stepsInput";
import { recipeSchema } from "./zodSchema";
import { CreateRecipeHeader } from "./header";
import { usePathname } from "next/navigation";

export default function RecipeForm() {
  const pathname = usePathname();

  type Form = z.infer<typeof recipeSchema>;

  const createDefaultValues = {
    servings: 2,
    ingredients: [
      {
        value: "",
      },
    ],
    steps: [
      {
        value: "",
      },
    ],
    links: [
      {
        value: "",
      },
    ],
  };

  const editDefaultValues = {
    // APIから取得したをデータへ変更予定
    servings: 2,
    ingredients: [
      {
        value: "",
      },
    ],
    steps: [
      {
        value: "",
      },
    ],
    links: [
      {
        value: "",
      },
    ],
  };

  const defaultValues = pathname.includes("edit") ? editDefaultValues : createDefaultValues;

  const form = useForm<Form>({
    resolver: zodResolver(recipeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<Form> = (data) => {
    console.log(data);
    const result = window.confirm("保存しますか？");
    if (result) {
      window.alert(data);
    }
  };

  return (
    <FormProvider {...form}>
      <CreateRecipeHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* レシピ名 */}
        <NameInput />

        {/* 材料*/}
        <IngredientInput />

        {/* 作り方*/}
        <StepsInput />

        {/* 画像 */}
        <ImageInput />

        {/* 紹介文 */}
        <DescriptionInput />

        {/* リンク */}
        <LinkInput />

        {/* ボタン */}
        {pathname.includes("edit") ? (
          <section className="pt-[8px] pb-[24px] ">
            <div className="flex gap-x-[16px] justify-center px-[16px]">
              <input type="submit" value="保存する" className="text-white bg-primary py-[8px] w-1/2 rounded-[4px]" />
              <button
                type="button"
                className="text-primary bg-white border-[1px] border-primary py-[8px] w-1/2 rounded-[4px]"
                onClick={() => window.alert("削除しました。")}
              >
                削除する
              </button>
            </div>
          </section>
        ) : pathname.includes("create") ? (
          <section className="pt-[8px] pb-[24px] px-[16px] ">
            <input
              type="submit"
              value="保存する"
              className="text-white bg-primary py-[8px] rounded-[4px] w-full cursor-pointer"
            />
          </section>
        ) : (
          <></>
        )}
      </form>
    </FormProvider>
  );
}
