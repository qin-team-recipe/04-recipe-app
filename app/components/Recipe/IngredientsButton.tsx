"use client";

import { trpcClient } from "@/app/utils/trpc-client";
import { toast } from "react-toastify";
import { ShoppingCartPlus } from "tabler-icons-react";

type IngredientsButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  ingredientId: number;
};

export const IngredientsButton = ({ className, ingredientId, ...props }: IngredientsButtonProps) => {
  const handleButtonClick = async () => {
    await trpcClient.shoppingList.addIngredientToList.mutate({ ingredientId });
    await toast.success("材料を買い物リストに追加しました！");
  };

  return (
    <button className={className} {...props} onClick={handleButtonClick}>
      <ShoppingCartPlus width={20} height={21} strokeWidth={1.5} />
    </button>
  );
};
