"use client";
import { AppendInputButton } from "@/app/components/Parts/Form/AppendInputButton";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ActionsButton } from "./Parts/ActionsButton";
import { ValidationError } from "./Parts/ValidationError";
import { CreateRecipeSchema } from "./zodSchema";

export default function StepsInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeSchema>();

  const fieldName = "steps";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
  });

  return (
    <section className="pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px]">作り方</h2>
      </div>

      <ul className="bg-white">
        {fields.map((step, index) => (
          <li className="relative" key={step.id}>
            <textarea
              {...register(`steps.${index}.value` as const)}
              placeholder="例：材料を適当な大きさに切ります。"
              className="block w-full text-title text-[14px] py-[13px] pl-[42px] pr-[50px] border-border border-b-[1px] bg-white leading-[18px]  min-h-[100px] focus:outline-text"
            ></textarea>

            <span className="absolute top-[14px] left-[16px] w-[18px] h-[18px] text-white text-[12px] rounded-full bg-primary text-center leading-[18px] ">
              {index + 1}
            </span>

            <div className="absolute top-[14px] right-[16px] ">
              <ActionsButton fieldName={fieldName} index={index} removeHandler={() => remove(index)} />
            </div>
          </li>
        ))}
      </ul>

      <AppendInputButton type="process" append={append} />

      {errors.steps &&
        (errors.steps as any).map((step: any, index: number) =>
          step?.value?.message ? (
            <ValidationError errorMessage={`作り方${index + 1}：${step?.value?.message}`} key={index} />
          ) : (
            <ValidationError errorMessage={`作り方${index + 1}：作り方を入力してください。`} key={index} />
          )
        )}
    </section>
  );
}
