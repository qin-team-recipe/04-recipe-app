import { Prisma } from "@prisma/client";
import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { ReorderMyMemoInput } from "./api-schema";

/**
 * 自分メモの要素を並び替える
 */
export const myMemoReorder = protectedProcedure.input(ReorderMyMemoInput).mutation(async ({ ctx, input }) => {
  const [sourceItem, targetItem] = await Promise.all([
    ctx.prisma.myMemoItem.findUnique({ where: { id: input.sourceItemId } }),
    ctx.prisma.myMemoItem.findUnique({ where: { id: input.targetItemId } }),
  ]);

  if (sourceItem === null || sourceItem.userId !== ctx.user.userId) throw notFoundError;
  if (targetItem === null || targetItem.userId !== ctx.user.userId) throw notFoundError;

  const reorder = async (tx: Prisma.TransactionClient) => {
    // 下に移動する場合
    if (sourceItem.sortOrder < targetItem.sortOrder) {
      await tx.myMemoItem.updateMany({
        where: {
          userId: ctx.user.userId,
          sortOrder: {
            gt: sourceItem.sortOrder,
            lte: targetItem.sortOrder,
          },
        },
        data: {
          sortOrder: { decrement: 1 },
        },
      });
    } else {
      // 上に移動する場合
      await tx.myMemoItem.updateMany({
        where: {
          userId: ctx.user.userId,
          sortOrder: {
            gte: targetItem.sortOrder,
            lt: sourceItem.sortOrder,
          },
        },
        data: {
          sortOrder: { increment: 1 },
        },
      });
    }
  };

  await ctx.prisma.$transaction(async (tx) => {
    await reorder(tx);
    await tx.myMemoItem.update({
      where: { id: sourceItem.id },
      data: { sortOrder: targetItem.sortOrder },
    });
  });
});
