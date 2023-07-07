"use client";

import { UseFieldArrayAppend } from "react-hook-form";
import { PlusIcon } from "../../Icons";
import { TIngredientFormSchema, TProfileFormSchema } from "@/app/profile/zodSchema";

type Props = {
  text: "リンク" | "材料" | "工程";
  append: UseFieldArrayAppend<TProfileFormSchema, "multiInputItems">;
};

export function AppendInputButton({ text, append }: Props) {
  const handleClick = () => {
    append({ value: "" });
  };

  return (
    <button type="button" className="flex items-center gap-1 mt-2 px-4" onClick={handleClick}>
      <PlusIcon className="stroke-primary" />
      <p className="text-primary">{`${text}を追加する`}</p>
    </button>
  );
}
