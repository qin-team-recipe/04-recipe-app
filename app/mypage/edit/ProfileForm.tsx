"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from "./zodSchema";
import type { TFieldValue } from "./types";
import type { TProfileFormSchema } from "./zodSchema";
import { CommonButton, MultiInputFields, TextField } from "@/app/components/Parts";
import { ImageInputField } from "@/app/components/Parts/Form/ImageInputField";

type Props = {
  links: TFieldValue[];
};

export function ProfileForm({ links }: Props) {
  const form = useForm<TProfileFormSchema>({
    defaultValues: {
      multiInputItems: links,
    },
    resolver: zodResolver(profileFormSchema),
  });

  const { formState, handleSubmit } = form;

  const onSubmit: SubmitHandler<TProfileFormSchema> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-[20px] pb-[48px] space-y-8">
        <TextField<TProfileFormSchema> label="ニックネーム" fieldName="nickname" />
        <ImageInputField<TProfileFormSchema> profile fieldName="profileImage" />
        <TextField<TProfileFormSchema> label="自己紹介(任意)" fieldName="biography" multiline />
        <MultiInputFields<TProfileFormSchema>
          type="ingredient"
          target="multiInputItems"
          errors={formState.errors.multiInputItems}
        />
        <div className="flex px-4 gap-4">
          <CommonButton primary>保存する</CommonButton>
          <CommonButton>キャンセル</CommonButton>
        </div>
      </form>
    </FormProvider>
  );
}
