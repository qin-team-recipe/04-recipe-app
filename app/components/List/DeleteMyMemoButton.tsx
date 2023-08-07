import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styles from "../../styles/dropdownMenuContent.module.css";
import { DotsCircleHorizontal } from "tabler-icons-react";
import { Trash, CircleCheck } from "tabler-icons-react";
import { useWatch } from "react-hook-form";

type Props = {
  remove: (i: number) => void;
};

export default function DeleteMyMemoButton({ remove }: Props) {
  const fieldArray = useWatch({
    name: "myMemoList",
  });

  const handleDeleteCheckedItems = () => {
    for (let i = fieldArray.length - 1; i >= 0; i--) {
      if (fieldArray[i].checked === true) {
        remove(i);
      }
    }
  };

  const handleDeleteAllItems = () => {
    for (let i = fieldArray.length - 1; i >= 0; i--) {
      remove(i);
    }
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <DotsCircleHorizontal className="hover:cursor-pointer" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={5} align="end" className={styles.DropdownMenuContent}>
          <ul>
            <li>
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
            </li>
            <li>
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
            </li>
          </ul>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
