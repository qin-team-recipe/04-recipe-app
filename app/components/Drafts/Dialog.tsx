"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { FC, useState } from "react";
import { Trash } from "tabler-icons-react";
import { toast } from "react-toastify";

type Props = {
  draftTitle: string;
};

export const Dialog: FC<Props> = ({ draftTitle }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDelete = (draftTitle: string) => {
    setDialogOpen(false);
    // APIで削除
    toast.success(`${draftTitle}の下書きを削除しました！`);
  };

  const headerButtonsHandler = () => {
    setDialogOpen(true);
  };

  return (
    <div className="absolute top-1/2 -translate-y-1/2 right-[16px] hover:cursor-pointer">
      <RadixDialog.Root open={dialogOpen} onOpenChange={() => headerButtonsHandler()}>
        <RadixDialog.Trigger asChild>
          <Trash size={24} strokeWidth={1} color={"#6F6E77"} />
        </RadixDialog.Trigger>

        <RadixDialog.Portal>
          <RadixDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <RadixDialog.Title className="text-title m-0 text-[17px] font-bold">削除しますか？</RadixDialog.Title>
            <RadixDialog.Description className="text-title mt-[10px] mb-5 text-[15px] leading-normal">
              {draftTitle}の下書きを削除しますか？
            </RadixDialog.Description>

            <div className="flex gap-x-[16px] justify-center px-[16px] mt-[25px]">
              {/* キャンセル */}
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="text-white bg-primary py-[8px] w-1/2 rounded-[4px]"
              >
                キャンセル
              </button>
              {/* OK */}
              <button
                type="button"
                onClick={() => handleDelete(draftTitle)}
                className="text-primary bg-white border-[1px] border-primary py-[8px] w-1/2 rounded-[4px]"
              >
                OK
              </button>
            </div>

            {/* クローズボタン */}
            <button
              type="button"
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
              onClick={() => setDialogOpen(false)}
            >
              <Cross2Icon />
            </button>
          </RadixDialog.Content>
        </RadixDialog.Portal>
      </RadixDialog.Root>
    </div>
  );
};
