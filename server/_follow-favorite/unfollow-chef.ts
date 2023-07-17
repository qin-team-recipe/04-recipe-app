import { protectedProcedure } from "../trpc/init-trpc";
import { FollowChefInput } from "./api-schema";

/**
 * シェフのフォローを解除する
 */
export const unfollowChef = protectedProcedure.input(FollowChefInput).mutation(async ({ ctx, input }) => {
  const following = await ctx.prisma.following.findUnique({
    where: {
      userId_chefId: {
        chefId: input.chefId,
        userId: ctx.user.userId,
      },
    },
  });
  if (following !== null) {
    await ctx.prisma.following.delete({ where: { id: following.id } });
  }
});
