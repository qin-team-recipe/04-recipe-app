"use client";

import { useFieldArray } from "react-hook-form";
import { AppendInputButton } from "./AppendInputButton";
import type {
  UseFormRegister,
  FormState,
  Control,
  FieldValues,
  FieldArrayWithId,
  UseFieldArrayAppend,
} from "react-hook-form";
import type { TMultilineInputItemsSchema, TProfileFormSchema, TIngredientFormSchema } from "@/app/profile/zodSchema";

type Props = {
  label: string;
  register: UseFormRegister<TProfileFormSchema>;
  formState: FormState<TProfileFormSchema>;
  control: Control<TProfileFormSchema, any>;
  fields: FieldArrayWithId<TProfileFormSchema, "multiInputItems", "id">[];
  append: UseFieldArrayAppend<TProfileFormSchema, "multiInputItems">;
};

export function MultiInputField({ label, register, formState, fields, append }: Props) {
  const { multiInputItems } = formState.errors;

  return (
    <div>
      <label className="font-bold text-title mb-1 px-4">{label}</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            type="text"
            className={`${
              index === 0 && "border-t-[1px]"
            } $ border-b-[1px] border-border py-[9px] px-4 w-full focus:outline-none text-black`}
            {...register(`multiInputItems.${index}.value`)}
          />
          {multiInputItems && (
            <p className="text-primary px-4 font-bold text-sm">{multiInputItems[index]?.value?.message}</p>
          )}
        </div>
      ))}
      <AppendInputButton text="リンク" append={append} />
    </div>
  );
}
