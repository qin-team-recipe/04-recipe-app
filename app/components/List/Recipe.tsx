"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSchema, ListSchema } from "./zodSchema";
import ListSection from "./ListSection";

type Props = {
  recipe: string;
  ingredients: { item: string; checked: boolean }[];
};

export default function Recipe({ ingredients, recipe }: Props) {
  const form = useForm<ListSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: { list: ingredients },
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <ListSection title={recipe} />
    </FormProvider>
  );
}
