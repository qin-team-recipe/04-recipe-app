"use client";
import { AppendInputButton } from "@/app/components/Parts/Form/AppendInputButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ActionsButton } from "../Parts/Form/ActionsButton";
import { ValidationError } from "./Parts/ValidationError";
import { CreateRecipeSchema } from "./zodSchema";

export default function LinkInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeSchema>();

  const fieldName = "urls";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
  });

  return (
    <section className="pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px]">リンク（任意）</h2>
      </div>

      <ul className="bg-white">
        {fields.map((url, index) => (
          <li className="text-[14px] border-border border-b-[1px] leading-[18px] relative" key={url.id}>
            <input
              type="text"
              className="py-[15.5px] pr-[48px] pl-[16px] block text-title text-[14px] w-full focus:outline-text"
              {...register(`${fieldName}.${index}.value` as const)}
              placeholder="https://instagram.com/example/"
            ></input>
            <div className="absolute top-1/2 -translate-y-1/2 right-[16px] ">
              <ActionsButton fieldName={fieldName} index={index} removeHandler={() => remove(index)} />
            </div>
          </li>
        ))}
      </ul>

      <AppendInputButton type="url" append={append} />

      {errors.urls &&
        (errors.urls as any).map((url: any, index: number) =>
          url?.value?.message ? (
            <ValidationError errorMessage={`url${index + 1}：${url?.value?.message}`} key={index} />
          ) : (
            <ValidationError errorMessage={`url${index + 1}：URLを入力してください。`} key={index} />
          )
        )}
    </section>
  );
}
