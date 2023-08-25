import { protectedProcedure } from "../trpc/init-trpc";

/**
 * 自分メモのすべてのアイテムを削除する
 */
export const myMemoDeleteAll = protectedProcedure.mutation(async ({ ctx }) => {
  const result = await ctx.prisma.myMemoItem.deleteMany({
    where: {
      userId: ctx.user.userId,
    },
  });
  return { count: result.count };
});
