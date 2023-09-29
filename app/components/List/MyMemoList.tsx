"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { myMemoListSchema, MyMemoListSchema } from "./zodSchema";
import MyMemoListSection from "./MyMemoListSection";
import { FC } from "react";

type Props = {
  myMemoList: {
    id: string;
    name: string;
    isChecked: boolean;
    sortOrder: number;
  }[];
};

export const MyMemoList: FC<Props> = ({ myMemoList }) => {
  const defaultValues = {
    list: myMemoList.map((memo) => ({
      name: memo.name,
      checked: memo.isChecked,
      myMemoItemId: memo.id,
    })),
  };

  const form = useForm<MyMemoListSchema>({
    resolver: zodResolver(myMemoListSchema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <MyMemoListSection />
    </FormProvider>
  );
};
