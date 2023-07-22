"use client";
import { AppendInputButton } from "@/app/components/Parts/Form/AppendInputButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ActionsButton } from "./Parts/ActionsButton";
import { ValidationError } from "./Parts/ValidationError";
import { CreateRecipeSchema } from "./zodSchema";

export default function LinkInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeSchema>();

  const fieldName = "links";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
  });

  return (
    <section className=" pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px]">リンク（任意）</h2>
      </div>

      <ul className="bg-white">
        {fields.map((link, index) => (
          <li className=" text-[14px] border-border border-b-[1px] leading-[18px] relative" key={link.id}>
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

      <AppendInputButton type="link" append={append} />

      {errors.links &&
        (errors.links as any).map((link: any, index: number) =>
          link?.value?.message ? (
            <ValidationError errorMessage={`link${index + 1}：${link?.value?.message}`} key={index} />
          ) : (
            <ValidationError errorMessage={`link${index + 1}：URLを入力してください。`} key={index} />
          )
        )}
    </section>
  );
}
