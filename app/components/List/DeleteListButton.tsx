import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "../../styles/dropdownMenuContent.module.css";
import { DotsCircleHorizontal, Trash, CircleCheck } from "tabler-icons-react";
import { useWatch } from "react-hook-form";
import { trpcClient } from "@/app/utils/trpc-client";
import { toast } from "react-toastify";

type Props = {
  id?: string;
  remove: (i: number) => void;
  refresh: () => void;
  title: string;
};

type Item = {
  name: string;
  checked: boolean;
};

export default function DeleteListButton({ id, remove, refresh, title }: Props) {
  const shopListRecipeId = id;

  const fieldArray = useWatch({
    name: "list",
  });

  // checkされているアイテムを削除する
  const handleDeleteCheckedItems = async () => {
    const removeAllCheckedItems = async () => {
      for (let i = fieldArray.length - 1; i >= 0; i--) {
        if (fieldArray[i].checked === true) {
          remove(i);
        }
      }
      // 買い物リストの場合
      if (shopListRecipeId) {
        await trpcClient.shoppingList.deleteCheckedShopListIngredients.mutate({ shopListRecipeId });
        await removeAllCheckedItems();
        toast.success(`${title}の完了した買い物リストを削除しました！`);
      } else {
        // じぶんメモの場合
        await trpcClient.shoppingList.myMemoDeleteCompleted.mutate();
        await removeAllCheckedItems();
        toast.success(`${title}の完了したアイテムを削除しました！`);
      }
      refresh();
    };
  };

  // 全てのアイテムを削除する
  const handleDeleteAllItems = async () => {
    const removeAll = async () => {
      for (let i = fieldArray.length - 1; i >= 0; i--) {
        remove(i);
      }
    };

    if (shopListRecipeId) {
      // 買い物リストの場合
      await trpcClient.shoppingList.deleteShopListRecipe.mutate({ shopListRecipeId });
      await removeAll();
      toast.success(`${title}の買い物リストを全て削除しました！`);
    } else {
      // じぶんメモ場合
      await trpcClient.shoppingList.myMemoDeleteAll.mutate();
      await removeAll();
      toast.success(`${title}を全て削除しました！`);
    }

    refresh();
  };

  const ifFieldArrayHasCheckedItems = fieldArray?.some((item: Item) => item.checked === true);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsCircleHorizontal className="hover:cursor-pointer" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5} align="end" className={styles.DropdownMenuContent}>
          {ifFieldArrayHasCheckedItems && (
            <DropdownMenu.Item>
              <button
                onClick={handleDeleteCheckedItems}
                type="button"
                className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
              >
                <CircleCheck
                  size={16}
                  strokeWidth={1}
                  color={"#6F6E77"}
                  className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                />
                完了したアイテムだけ削除する
              </button>
            </DropdownMenu.Item>
          )}
          <DropdownMenu.Item>
            <button
              onClick={handleDeleteAllItems}
              type="button"
              className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
            >
              <Trash
                size={16}
                strokeWidth={1}
                color={"#6F6E77"}
                className="absolute top-1/2 -translate-y-1/2 left-[12px]"
              />
              すべてのアイテムを削除する
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
