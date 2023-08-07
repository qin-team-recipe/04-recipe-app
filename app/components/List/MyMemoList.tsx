"use client";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MyMemoSchema, myMemoSchema } from "./zodSchema";
import { ActionsButton } from "../Parts/Form/ActionsButton";
import { ValidationError } from "../CreateRecipe/Parts/ValidationError";
import AddMyMemoButton from "./AddMyMemoButton";
import DeleteMyMemoButton from "./DeleteMyMemoButton";

// DBから取得する仕様に変更予定
const defaultValues = {
  myMemoList: [
    {
      item: "マカロニ",
      checked: false,
    },
    {
      item: "生クリーム",
      checked: false,
    },
  ],
};

export default function MyMemoList() {
  const form = useForm<MyMemoSchema>({
    resolver: zodResolver(myMemoSchema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    control,
    register,
    formState: { errors },
    watch,
  } = form;

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "myMemoList",
  });

  const toggleMyMemoChecked = (index: number) => {
    update(index, { checked: !fields[index].checked, item: fields[index].item });
  };

  console.log(fields);
  console.log(watch("myMemoList"));

  return (
    <FormProvider {...form}>
      <section className="pt-[8px] pb-[24px] ">
        <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
          <h2 className="font-bold text-title text-[16px]">じぶんメモ</h2>
          <div className="flex gap-x-[16px]">
            {/* 追加ボタン */}
            <AddMyMemoButton append={append} />
            {/* 一括削除ボタン */}
            <DeleteMyMemoButton remove={remove} />
          </div>
        </div>
        {fields.length === 0 ? (
          <p className="text-title pt-[20px] px-[15px]">じぶんメモがありません！</p>
        ) : (
          <>
            <ul className="bg-white">
              {fields.map((memo, index) => (
                <li key={memo.id} className="text-[14px] border-border border-b-[1px] leading-[18px] relative">
                  <input
                    type="checkbox"
                    className={`
               appearance-none absolute w-[20px] h-[20px] top-1/2 -translate-y-1/2 left-[16px] 
              ${
                memo.checked
                  ? "after:content-[''] after:absolute after:w-[20px] after:h-[20px] bg-[url('/images/checked.png')]"
                  : "before:content-[''] cursor-pointer before:absolute before:w-[20px] before:h-[20px] before:border-primary before:border-[1.5px] before:rounded-full"
              }
              `}
                    checked={memo.checked}
                    {...register(`myMemoList.${index}.checked` as const, {
                      onChange: () => toggleMyMemoChecked(index),
                    })}
                  ></input>
                  <textarea
                    className="py-[15.5px] pr-[48px] pl-[46px] block text-title text-[14px] w-full focus:outline-text leading-[18px] resize-none h-[49px]"
                    {...register(`myMemoList.${index}.item` as const, {
                      onBlur: () => window.alert("フォーカスアウトしたときにsubmitする"),
                    })}
                  ></textarea>
                  <div className="absolute top-1/2 -translate-y-1/2 right-[16px] ">
                    <ActionsButton fieldName={"myMemoList"} index={index} removeHandler={() => remove(index)} />
                  </div>
                </li>
              ))}
            </ul>
            {errors.myMemoList &&
              (errors.myMemoList as any).map(
                (myMemo: any, index: number) =>
                  myMemo?.item?.message && (
                    <ValidationError errorMessage={`${index + 1}：${myMemo?.item?.message}`} key={index} />
                  )
              )}
          </>
        )}
      </section>
    </FormProvider>
  );
}
