"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listSchema, ListSchema } from "./zodSchema";
import ListSection from "./ListSection";

type Props = {
  name: string;
  ingredients: { name: string; checked: boolean }[];
};

export default function Recipe({ ingredients, name }: Props) {
  const form = useForm<ListSchema>({
    resolver: zodResolver(listSchema),
    defaultValues: { list: ingredients },
    mode: "onBlur",
  });

  return (
    <FormProvider {...form}>
      <ListSection title={name} />
    </FormProvider>
  );
}
