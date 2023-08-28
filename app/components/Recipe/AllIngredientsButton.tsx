"use client";

import { trpcClient } from "@/app/utils/trpc-client";
import { toast } from "react-toastify";
import { ShoppingCartPlus } from "tabler-icons-react";

type AllIngredientsButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  recipeId: string;
};

export const AllIngredientsButton = ({ className, recipeId, ...props }: AllIngredientsButtonProps) => {
  const handleAddAllIngredientsButtonClick = async () => {
    await trpcClient.shoppingList.addAllIngredientsToList.mutate({ recipeId });
    await toast.success("レシピの全ての材料を買い物リストに追加しました！");
  };

  return (
    <button className={className} onClick={handleAddAllIngredientsButtonClick} {...props}>
      <ShoppingCartPlus width={18} height={18} strokeWidth={2} className="absolute left-0 top-1/2 -translate-y-1/2" />
      まとめてお買い物に追加
    </button>
  );
};
