"use client";
import { useFormContext } from "react-hook-form";
import { ValidationError } from "./Parts/ValidationError";
import { CreateRecipeSchema } from "./zodSchema";

export default function NameInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateRecipeSchema>();

  return (
    <section className="pt-[8px] pb-[24px]">
      <label className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px]">レシピ名</h2>
      </label>
      <input
        className="bg-white w-full border-border border-b-[1px] py-[13px] px-[16px] text-title focus:outline-text"
        placeholder="例：肉じゃが"
        type="text"
        {...register("title")}
      ></input>

      {errors["title"] && <ValidationError errorMessage={errors["title"]?.message as string} />}
    </section>
  );
}
