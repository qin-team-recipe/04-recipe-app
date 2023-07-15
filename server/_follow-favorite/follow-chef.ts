import { protectedProcedure } from "../trpc/init-trpc";
import { FollowChefInput } from "./api-schema";

/**
 * シェフをフォローする
 */
export const followChef = protectedProcedure.input(FollowChefInput).mutation(async ({ ctx, input }) => {
  await ctx.prisma.following.upsert({
    where: {
      userId_chefId: {
        userId: ctx.user.userId,
        chefId: input.chefId,
      },
    },
    create: {
      userId: ctx.user.userId,
      chefId: input.chefId,
    },
    update: {},
  });
});
