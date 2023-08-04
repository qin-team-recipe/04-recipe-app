import { trpcClient } from "@/app/utils/trpc-client";
import { useCallback } from "react";
import { toast } from "react-toastify";

type FavoriteButtonProps = {
  isFavoriting: boolean;
  recipeId: string;
  refresh: () => void;
  isLoggedIn: boolean;
  onUnauthenticated: () => void;
};

export function FavoriteButton({
  isFavoriting,
  isLoggedIn,
  recipeId,
  refresh,
  onUnauthenticated,
}: FavoriteButtonProps) {
  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      onUnauthenticated();
      return;
    }

    if (!isFavoriting) {
      await trpcClient.favoriteRecipe.mutate({ recipeId });
      toast.success("レシピをお気にいりに追加しました！");
      refresh();
    } else {
      await trpcClient.unfavoriteRecipe.mutate({ recipeId });
      toast.success("レシピのお気にいりを解除しました！");
      refresh();
    }
  }, [isFavoriting, isLoggedIn, recipeId, refresh, onUnauthenticated]);

  return (
    <>
      <button
        className={
          "w-full py-[8px] px-[12px] rounded-[4px] text-[14px] leading-[17px]" +
          (isFavoriting ? " text-primary bg-white border border-primary" : " text-white bg-primary")
        }
        onClick={handleClick}
      >
        {isFavoriting ? "お気に入りに追加済み" : "お気に入りに追加"}
      </button>
    </>
  );
}
