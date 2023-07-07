"use client";

import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { CommonButton, MultiInputField, TextField } from "../components/Parts";
import { ProfileImage } from "./ProfileImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema, ingredientFormSchema } from "./zodSchema";
import type { TFieldValue } from "./type";
import type { TProfileFormSchema, TIngredientFormSchema } from "./zodSchema";

type Props = {
  links: TFieldValue[];
};

export function ProfileForm({ links }: Props) {
  // プロフィールフォーム全体のRHF設定
  const useFormObj = useForm<TProfileFormSchema>({
    defaultValues: {
      multiInputItems: links,
    },
    resolver: zodResolver(profileFormSchema),
  });

  const useFieldArrayObj = useFieldArray({
    name: "multiInputItems",
    control: useFormObj.control,
  });

  const onSubmit: SubmitHandler<TProfileFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={useFormObj.handleSubmit(onSubmit)} className="pt-[20px] pb-[48px] space-y-8">
      <TextField label="ニックネーム" registerName="nickname" {...useFormObj} />
      <ProfileImage />
      <TextField label="自己紹介&ensp;(任意)" registerName="biography" {...useFormObj} multiline />
      <MultiInputField label="リンク&ensp;(任意)" {...useFormObj} {...useFieldArrayObj} />
      <div className="flex px-4 gap-4">
        <CommonButton primary>保存する</CommonButton>
        <CommonButton>キャンセル</CommonButton>
      </div>
    </form>
  );
}
