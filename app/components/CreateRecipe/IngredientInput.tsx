"use client";

import { AppendInputButton } from "@/app/components/Parts/Form/AppendInputButton";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { ActionsButton } from "../../components/CreateRecipe/parts/actionsButton";
import { ValidationError } from "../../components/CreateRecipe/parts/validationError";

export default function IngredientInput() {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const fieldName = "ingredients";

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
  });

  const servings = useWatch({
    name: "servings",
  });

  const servingsIncreaseHandler = () => {
    if (servings < 6) {
      setValue("servings", servings + 1, { shouldDirty: true });
    }
  };

  const servingsDecreaseHandler = () => {
    if (servings > 2) {
      setValue("servings", servings - 1, { shouldDirty: true });
    }
  };

  return (
    <section className=" pt-[8px] pb-[24px] ">
      <div className="flex gap-x-[20px] py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px]">材料 / {servings}人前</h2>
        <input hidden className="display-none" type="number" {...register("servings")}></input>

        <div className="flex gap-x-[10px] text-[25px]">
          {/* マイナスボタン */}
          <button type="button" className="hover:bg-[#FFF0EE] hover:fill-[#ca3214]" onClick={servingsDecreaseHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <rect
                width="16"
                height="16"
                transform="translate(0 0.5)"
                // fill="#FFF0EE"
                fill={servings > 2 ? "#FFF0EE" : "#F2F2F2"}
              />
              <path
                d="M3.33325 8.5H12.6666"
                stroke={servings > 2 ? "#CA3214" : "#D1D1D1"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          {/* プラスボタン */}
          <button type="button" onClick={servingsIncreaseHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <rect
                width="16"
                height="16"
                transform="translate(0 0.5)"
                // fill="#FFF0EE"
                fill={servings < 6 ? "#FFF0EE" : "#F2F2F2"}
              />
              <path
                d="M7.99992 3.83333V13.1667M3.33325 8.49999H12.6666"
                stroke={servings < 6 ? "#CA3214" : "#D1D1D1"}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <ul className="bg-white">
        {fields.map((ingredient, index) => (
          <li className=" text-[14px] border-border border-b-[1px] leading-[18px] relative" key={ingredient.id}>
            <input
              className="bg-white w-full  py-[16px] pr-[48px] pl-[18px] text-title focus:outline-text"
              {...register(`ingredients.${index}.value` as const)}
              placeholder="例：じゃがいも"
            ></input>

            <div className="absolute top-1/2 -translate-y-1/2 right-[16px] ">
              <ActionsButton fieldName={fieldName} index={index} removeHandler={() => remove(index)} />
            </div>
          </li>
        ))}
      </ul>

      <AppendInputButton type="ingredient" append={append} />

      {errors.servings && <ValidationError errorMessage={(errors.servings as any).message} />}

      {errors.ingredients &&
        (errors.ingredients as any).map((ingredient: any, index: number) =>
          ingredient?.value?.message ? (
            <ValidationError errorMessage={`材料${index + 1}：${ingredient?.value?.message}`} key={index} />
          ) : (
            <ValidationError errorMessage={`材料${index + 1}：材料名を入力してください。`} key={index} />
          )
        )}
    </section>
  );
}
