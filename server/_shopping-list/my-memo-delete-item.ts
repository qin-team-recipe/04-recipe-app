import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { MyMemoItemIdInput } from "./api-schema";

/**
 * 自分メモのアイテムを削除する
 */
export const myMemoDeleteItem = protectedProcedure.input(MyMemoItemIdInput).mutation(async ({ ctx, input }) => {
  const myMemoItem = await ctx.prisma.myMemoItem.findUnique({ where: { id: input.myMemoItemId } });
  if (myMemoItem === null || myMemoItem.userId != ctx.user.userId) {
    throw notFoundError;
  }

  return await ctx.prisma.myMemoItem.delete({
    where: { id: input.myMemoItemId },
  });
});
