"use client";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LinkInput from "./LinkInput";
import NameInput from "./NameInput";
import IngredientInput from "./IngredientInput";
import DescriptionInput from "./DescriptionInput";
import ImageInput from "./ImageIput";
import StepsInput from "./StepsInput";
import { CreateRecipeSchema, recipeSchema } from "./zodSchema";
import { CreateRecipeHeader } from "./Header";
import { usePathname } from "next/navigation";
import { FC } from "react";

type Props = {
  userId?: string;
};

export const RecipeForm: FC<Props> = ({ userId }) => {
  const pathname = usePathname();
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

  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(recipeSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit: SubmitHandler<CreateRecipeSchema> = (data) => {
    console.log(data);
    const result = window.confirm("保存しますか？");
    if (result) {
      window.alert(data);
    }
  };

  return (
    <FormProvider {...form}>
      <CreateRecipeHeader userId={userId} />

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
};
