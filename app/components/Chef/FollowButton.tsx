"use client";

import { trpcClient } from "@/app/utils/trpc-client";
import { useCallback } from "react";

type FollowButtonProps = {
  isFollowing: boolean;
  chefId: string;
  refresh: () => void;
  isLoggedIn: boolean;
  onUnauthenticated: () => void;
};

export function FollowButton({ isFollowing, chefId, refresh, isLoggedIn, onUnauthenticated }: FollowButtonProps) {
  const handleClick = useCallback(async () => {
    if (!isLoggedIn) {
      onUnauthenticated();
      return;
    }

    if (!isFollowing) {
      await trpcClient.followChef.mutate({ chefId });
      refresh();
    } else {
      await trpcClient.unfollowChef.mutate({ chefId });
      refresh();
    }
  }, [isFollowing, chefId, refresh, isLoggedIn, onUnauthenticated]);

  return (
    <button
      className={
        "w-full py-[8px] px-[12px] rounded-[4px] text-[14px] leading-[17px]" +
        (isFollowing ? " text-primary bg-white border border-primary" : " text-white bg-primary")
      }
      onClick={handleClick}
    >
      {isFollowing ? "フォロー中" : "フォローする"}
    </button>
  );
}
