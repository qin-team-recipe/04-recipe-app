import { z } from "zod";
import { protectedProcedure } from "../trpc/init-trpc";
import { MyMemoContent } from "./api-schema";

/**
 * 自分メモのアイテムを追加する
 */
export const myMemoAddItem = protectedProcedure
  .input(z.object({ content: MyMemoContent }))
  .mutation(async ({ ctx, input }) => {
    const maxSortOrder = (
      await ctx.prisma.myMemoItem.findMany({
        where: { userId: ctx.user.userId },
        select: { sortOrder: true },
      })
    ).reduce((max, item) => Math.max(max, item.sortOrder), 0);

    return await ctx.prisma.myMemoItem.create({
      data: {
        content: input.content,
        userId: ctx.user.userId,
        isChecked: false,
        sortOrder: maxSortOrder + 1,
      },
    });
  });
