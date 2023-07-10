"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { AppendInputButton } from "./AppendInputButton";
import type { Path, ArrayPath, FieldValues, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import type { TMultiInputFieldType } from "./utils/types";
import { getLabelAndDescription } from "./utils/helpers";

type Props<T extends FieldValues> = {
  type: TMultiInputFieldType;
  target: ArrayPath<T>;
  errors:
    | Merge<
        FieldError,
        (
          | Merge<
              FieldError,
              FieldErrorsImpl<{
                value: string;
              }>
            >
          | undefined
        )[]
      >
    | undefined;
};

export function MultiInputField<T extends FieldValues>({ type, target, errors }: Props<T>) {
  const { register, control } = useFormContext<T>();

  const { fields, append } = useFieldArray<T>({
    name: target,
    control,
  });

  return (
    <div>
      <label className="font-bold text-title mb-1 px-4">{getLabelAndDescription(type).label}</label>
      {fields.map((field, index) => (
        <div key={field.id}>
          <input
            type="text"
            className={`${
              index === 0 && "border-t-[1px]"
            } $ border-b-[1px] border-border py-[9px] px-4 w-full focus:outline-none text-black`}
            // FIXME: アサーション削除
            {...register(`multiInputItems.${index}.value` as Path<T>)}
          />
          {errors && <p className="text-primary px-4 font-bold text-sm">{errors[index]?.value?.message}</p>}
        </div>
      ))}
      <AppendInputButton type={type} append={append} />
    </div>
  );
}
