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

import { createMyRecipeInput } from "../../../server/_my-recipe/api-schema";
import { z } from "zod";

type ServerRecipeSchema = z.infer<typeof createMyRecipeInput>;

// ファイルをBase64エンコードして返す関数
//TODO サーバー側で実装するべき？
const readFileAsBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const base64Encoder = new FileReader();
    base64Encoder.onload = () => {
      resolve(base64Encoder.result as string);
    };
    base64Encoder.readAsDataURL(file);
    base64Encoder.onerror = reject;
  });
};

const transformedServerScheme = async (input: CreateRecipeSchema) => {
  let imageFile: string[] = [];

  if (typeof input.image !== "undefined") {
    imageFile.push((await readFileAsBase64(input.image)) as string);
  }

  return {
    ...input,
    ingredients: input.ingredients.map((item) => item.value),
    processes: input.processes.map((item) => item.value),
    urls: input.urls.map((item) => item.value as string),
    images: imageFile,
  };
};

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
    formState: { errors },
  } = form;

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
          <></>
        )}
      </form>
    </FormProvider>
  );
};
