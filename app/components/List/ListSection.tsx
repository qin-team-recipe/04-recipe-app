"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import AddListButton from "./AddListButton";
import DeleteListButton from "./DeleteListButton";
import { ListSchema } from "./zodSchema";
import { ActionsButton } from "../Parts/Form/ActionsButton";
import { ValidationError } from "../CreateRecipe/Parts/ValidationError";

export default function ListSection({ title }: { title: string }) {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ListSchema>();

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const toggleMyMemoChecked = (index: number) => {
    update(index, { checked: !fields[index].checked, item: fields[index].item });
  };

  return (
    <section className="pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px] truncate">{title}</h2>
        <div className="flex gap-x-[16px]">
          {/* 追加ボタン */}
          <AddListButton append={append} />
          {/* 一括削除ボタン */}
          <DeleteListButton remove={remove} />
        </div>
      </div>
      {fields.length === 0 ? (
        <p className="text-title pt-[20px] px-[15px]">
          {title === "じぶんメモ" ? "じぶんメモがありません！" : "お買い物リストがありません！"}
        </p>
      ) : (
        <>
          <ul className="bg-white">
            {fields.map((memo, id) => (
              <li key={memo.id} className="relative border-border border-b-[1px] ">
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
                  {...register(`list.${id}.checked` as const, {
                    onChange: () => toggleMyMemoChecked(id),
                  })}
                ></input>
                <textarea
                  className="py-[15.5px] pr-[48px] pl-[46px] block text-title text-[14px] w-full focus:outline-text leading-[18px] resize-none"
                  {...register(`list.${id}.item` as const, {
                    onBlur: () => window.alert("フォーカスアウトしたときにsubmitする"),
                  })}
                ></textarea>
                <div className="absolute top-1/2 -translate-y-1/2 right-[16px] ">
                  <ActionsButton fieldName={"list"} index={id} removeHandler={() => remove(id)} />
                </div>
              </li>
            ))}
          </ul>
          {errors.list &&
            (errors.list as any).map(
              (myMemo: any, index: number) =>
                myMemo?.item?.message && (
                  <ValidationError errorMessage={`${index + 1}：${myMemo?.item?.message}`} key={index} />
                )
            )}
        </>
      )}
    </section>
  );
}
