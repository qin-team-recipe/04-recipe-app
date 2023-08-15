"use client";

import { trpcClient } from "@/app/utils/trpc-client";
import { useState } from "react";
import { toast } from "react-toastify";
import { ShoppingCartPlus } from "tabler-icons-react";

type IngredientsButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  ingredientId: number;
  isAddedToList?: boolean;
};

export const IngredientsButton = ({
  className,
  ingredientId,
  isAddedToList = false,
  ...props
}: IngredientsButtonProps) => {
  const [isAdded, setIsAdded] = useState<boolean>(isAddedToList);

  const handleButtonClick = async () => {
    if (isAddedToList) {
      await trpcClient.shoppingList.removeIngredientFromList.mutate({ ingredientId });
      await toast.success("材料を買い物リストから削除しました！");
      setIsAdded(false);
    } else {
      await trpcClient.shoppingList.addIngredientToList.mutate({ ingredientId });
      await toast.success("材料を買い物リストに追加しました！");
      setIsAdded(true);
    }
  };

  return (
    <button
      className={`${className} ${isAdded ? "stroke-primary text-primary" : ""}`}
      {...props}
      onClick={handleButtonClick}
    >
      <ShoppingCartPlus width={20} height={21} strokeWidth={1.5} />
    </button>
  );
};
