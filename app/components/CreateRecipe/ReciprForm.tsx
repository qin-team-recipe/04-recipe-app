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
import { trpcClient } from "@/app/utils/trpc-client";
import React from "react";

export const RecipeForm = () => {
  const pathname = usePathname();
  const createDefaultValues = {
    yields: 2,
    ingredients: [
      {
        value: "",
      },
    ],
    processes: [
      {
        value: "",
      },
    ],
    urls: [
      {
        value: "",
      },
    ],
  };

  const editDefaultValues = {
    // APIから取得したをデータへ変更予定
    yields: 2,
    ingredients: [
      {
        value: "",
      },
    ],
    processes: [
      {
        value: "",
      },
    ],
    urls: [
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
    getFieldState,
    formState: { errors },
  } = form;

  const transformedServerScheme = async (input: CreateRecipeSchema) => {
    let imageUrl = null;
    const fileData = input.image;

    if (typeof fileData !== "undefined") {
      const readFile = new Promise<string | null>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = function (event: ProgressEvent<FileReader>) {
          if (event.target) {
            const base64Url = event.target.result as string;
            resolve(base64Url);
          } else {
            resolve(null);
          }
        };
        reader.onerror = function () {
          resolve(null);
        };
        reader.readAsDataURL(fileData);
      });

      imageUrl = await readFile;
    }

    const images = imageUrl ? [imageUrl] : [];

    return {
      ...input,
      ingredients: input.ingredients.map((item) => item.value),
      processes: input.processes.map((item) => item.value),
      urls:
        input.urls && getFieldState("urls").isDirty
          ? input.urls.map((item) => item.value as string)
          : ["https://google.com"],
      images,
    };
  };

  const onSubmit: SubmitHandler<CreateRecipeSchema> = async (data) => {
    const result = window.confirm("保存しますか？");
    if (result) {
      const shapedData = await transformedServerScheme(data);
      await trpcClient.regmyrecipe.mutate(shapedData);
    }
  };

  return (
    <FormProvider {...form}>
      <CreateRecipeHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* レシピ名 */}
        <NameInput />

        {/* 材料 */}
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
          <React.Fragment></React.Fragment>
        )}
      </form>
    </FormProvider>
  );
};
