"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSchema, ListSchema } from "./zodSchema";
import ShopListSection from "./ShopListSection";

type Props = {
  id: string;
  name: string;
  ingredients: { name: string; checked: boolean; shopListIngredientId: string }[];
};

export default function Recipe({ id, ingredients, name }: Props) {
  const form = useForm<ListSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: { list: ingredients },
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <ShopListSection title={name} id={id} />
    </FormProvider>
  );
}
