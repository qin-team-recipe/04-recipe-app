"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSchema, ListSchema } from "./zodSchema";
import ListSection from "./ListSection";

// DBから取得する仕様に変更予定
const defaultValues = {
  list: [
    { item: "マカロニ", checked: false },
    {
      item: "生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム生クリーム",
      checked: false,
    },
  ],
};

export default function MyMemoList() {
  const form = useForm<ListSchema>({
    resolver: zodResolver(listSchema),
    defaultValues,
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <ListSection title="じぶんメモ" />
    </FormProvider>
  );
}
