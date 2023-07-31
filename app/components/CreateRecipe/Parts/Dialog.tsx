"use client";
import * as RadixDialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CreateRecipeSchema } from "../zodSchema";

type Props = {
  direction: string;
  triggerButton: React.ReactNode;
  userId?: string;
};

export const Dialog: FC<Props> = ({ direction, triggerButton, userId }) => {
  const router = useRouter();
  const { getFieldState } = useFormContext<CreateRecipeSchema>();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTrafficHandler = (direction: string) => {
    setDialogOpen(false);
    if (direction === "goBack") {
      if (window.history.length > 1) {
        router.back();
      } else {
        router.push(`/mypage/${userId}/myrecipes`);
      }
    }
    if (direction === "drafts") {
      router.push("/my-recipe/drafts");
    }
  };

  const headerButtonsHandler = (direction: string) => {
    if (
      getFieldState("servings").isDirty ||
      getFieldState("description").isDirty ||
      getFieldState("title").isDirty ||
      getFieldState("image").isDirty ||
      getFieldState("ingredients").isDirty ||
      getFieldState("steps").isDirty ||
      getFieldState("links").isDirty
    ) {
      setDialogOpen(true);
    } else {
      handleTrafficHandler(direction);
    }
  };
  return (
    <RadixDialog.Root open={dialogOpen} onOpenChange={() => headerButtonsHandler(direction)}>
      <RadixDialog.Trigger asChild>{triggerButton}</RadixDialog.Trigger>

      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <RadixDialog.Content className="data-[state=open]:animate-contentShow fixed top-[30%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <RadixDialog.Title className="text-title m-0 text-[17px] font-bold">移動しますか？</RadixDialog.Title>
          <RadixDialog.Description className="text-title mt-[10px] mb-5 text-[15px] leading-normal">
            もしページを離れると、変更は失われてしまいます。<br></br>よろしいですか？
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
              onClick={() => handleTrafficHandler(direction)}
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
  );
};
