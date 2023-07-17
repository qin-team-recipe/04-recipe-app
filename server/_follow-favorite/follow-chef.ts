import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import { FollowChefInput } from "./api-schema";
import { validateChefId } from "./utils";

/**
 * シェフをフォローする
 */
export const followChef = protectedProcedure.input(FollowChefInput).mutation(async ({ ctx, input }) => {
  const result = await validateChefId(ctx.prisma, input.chefId);
  if (!result.success) {
    throw new TRPCError({ code: "BAD_REQUEST", message: result.error });
  }

  const following = await ctx.prisma.following.upsert({
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
  return following;
});
