"use client";
import { useFieldArray, useFormContext } from "react-hook-form";
import AddListButton from "./AddListButton";
import DeleteListButton from "./DeleteListButton";
import { ListSchema } from "./zodSchema";
import { ActionsButton } from "../Parts/Form/ActionsButton";
import { ValidationError } from "../CreateRecipe/Parts/ValidationError";
import { useRouter } from "next/navigation";
import { trpcClient } from "@/app/utils/trpc-client";
import { toast } from "react-toastify";

export default function ShopListSection({ title, id }: { title: string; id?: string }) {
  const shopListRecipeId = id;

  const {
    register,
    formState: { errors },
    control,
  } = useFormContext<ListSchema>();

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: "list",
  });

  const toggleMyMemoChecked = async (id: number) => {
    update(id, {
      checked: !fields[id].checked,
      name: fields[id].name,
      shopListIngredientId: fields[id].shopListIngredientId,
    });

    const shopListIngredientId = fields[id].shopListIngredientId;
    if (shopListIngredientId) {
      await trpcClient.shoppingList.updateShopListIngredient.mutate({
        shopListIngredientId,
        isChecked: !fields[id].checked,
      });
      router.refresh();
    }
  };

  const router = useRouter();

  const removeHandler = async (id: number) => {
    const shopListIngredientId = fields[id].shopListIngredientId;
    if (shopListIngredientId) {
      const shopListIngredientName = fields[id].name;
      await trpcClient.shoppingList.deleteShopListIngredient.mutate({ shopListIngredientId });
      toast.success(`${shopListIngredientName}を削除しました！`);
    }
    remove(id);
    router.refresh();
  };

  const onBlurHandler = async (id: number, event: React.FocusEvent<HTMLTextAreaElement>) => {
    const currentValue = event.target.value;
    const shopListIngredientId = fields[id].shopListIngredientId;

    if (!errors.list && shopListIngredientId !== "" && shopListIngredientId) {
      await trpcClient.shoppingList.updateShopListIngredient.mutate({
        shopListIngredientId,
        isChecked: fields[id].checked,
        name: currentValue,
      });
      router.refresh();
    } else if (!errors.list && shopListIngredientId == "" && shopListRecipeId !== undefined) {
      await trpcClient.shoppingList.appendShopListIngredient.mutate({
        shopListRecipeId,
        name: currentValue,
      });
      router.refresh();
    }
  };

  return (
    <section className="pt-[8px] pb-[24px] ">
      <div className="flex justify-between py-[12px] items-center px-[16px] border-border border-b-[1px]">
        <h2 className="font-bold text-title text-[16px] truncate">{title}</h2>
        <div className="flex gap-x-[16px]">
          {/* 追加ボタン */}
          <AddListButton append={append} title="買い物リスト" />
          {/* 一括削除ボタン */}
          <DeleteListButton remove={remove} id={id} refresh={() => router.refresh()} title={title} />
        </div>
      </div>
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
              {...register(`list.${id}.name` as const, {
                onBlur: (event) => onBlurHandler(id, event),
              })}
            ></textarea>
            <div className="absolute top-1/2 -translate-y-1/2 right-[16px] ">
              <ActionsButton fieldName={"list"} index={id} removeHandler={() => removeHandler(id)} />
            </div>
          </li>
        ))}
      </ul>
      {errors.list &&
        (errors.list as any).map(
          (myMemo: any, index: number) =>
            myMemo?.name?.message && (
              <ValidationError errorMessage={`${index + 1}：${myMemo?.name?.message}`} key={index} />
            )
        )}
    </section>
  );
}
