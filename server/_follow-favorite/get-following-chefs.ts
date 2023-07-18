import { protectedProcedure } from "../trpc/init-trpc";
import { getImageUrl } from "../utils/cloudinary";

/**
 * フォローしているシェフの一覧を取得する
 */
export const getFollowingChefs = protectedProcedure.query(async ({ ctx }) => {
  const followings = await ctx.prisma.following.findMany({
    where: { userId: ctx.user.userId },
    include: { chef: true },
  });

  const chefs = followings.map(({ chef }) => ({
    id: chef.id,
    displayName: chef.displayName,
    profileImageUrl: getImageUrl(chef.profileImage),
  }));
  return chefs;
});
