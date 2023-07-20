import { trpcClient } from "@/app/utils/trpc-client";
import { useCallback } from "react";

type FavoriteButtonProps = {
  isFavoriting: boolean;
  recipeId: string;
  refresh: () => void;
};

export function FavoriteButton({ isFavoriting, recipeId, refresh }: FavoriteButtonProps) {
  const handleClick = useCallback(async () => {
    if (!isFavoriting) {
      await trpcClient.favoriteRecipe.mutate({ recipeId });
      refresh();
    } else {
      await trpcClient.unfavoriteRecipe.mutate({ recipeId });
      refresh();
    }
  }, [isFavoriting, recipeId, refresh]);

  return (
    <button
      className={
        "w-full py-[8px] px-[12px] rounded-[4px] text-[14px] leading-[17px]" +
        (isFavoriting ? " text-primary bg-white border border-primary" : " text-white bg-primary")
      }
      onClick={handleClick}
    >
      {isFavoriting ? "お気に入りに追加済み" : "お気に入りに追加"}
    </button>
  );
}
