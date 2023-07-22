"use client";
import { useFormContext } from "react-hook-form";
import { ValidationError } from "./Parts/ValidationError";

export default function DescriptionInput() {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <section className=" pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px]">レシピの紹介文（任意）</h2>
      </div>
      <textarea
        className=" h-[72px] py-[12px] px-[16px] text-title text-[14px] focus:outline-text border-border border-b-[1px] bg-white leading-[18px] block w-full"
        placeholder="レシピの紹介文を入力してください。"
        {...register("description")}
      ></textarea>

      {errors["description"] && <ValidationError errorMessage={errors["description"]?.message as string} />}
    </section>
  );
}
