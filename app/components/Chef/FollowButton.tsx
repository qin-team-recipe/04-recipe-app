"use client";

import { trpcClient } from "@/app/utils/trpc-client";
import { useCallback } from "react";

type FollowButtonProps = {
  isFollowing: boolean;
  chefId: string;
  refresh: () => void;
};

export const FollowButton = ({ isFollowing, chefId, refresh }: FollowButtonProps) => {
  const handleClick = useCallback(async () => {
    if (!isFollowing) {
      await trpcClient.followChef.mutate({ chefId });
      refresh();
    } else {
      await trpcClient.unfollowChef.mutate({ chefId });
      refresh();
    }
  }, [isFollowing, chefId, refresh]);

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
};
