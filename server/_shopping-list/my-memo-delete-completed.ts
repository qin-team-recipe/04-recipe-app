import { protectedProcedure } from "../trpc/init-trpc";

/**
 * 自分メモのチェック済みのアイテムを削除する
 */
export const myMemoDeleteCompleted = protectedProcedure.mutation(async ({ ctx }) => {
  const result = await ctx.prisma.myMemoItem.deleteMany({
    where: {
      userId: ctx.user.userId,
      isChecked: true,
    },
  });
  return { count: result.count };
});
