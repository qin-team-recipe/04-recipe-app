import { protectedProcedure } from "../trpc/init-trpc";
import { UpdateMyMemoItemInput } from "./api-schema";
import { notFoundError } from "../trpc/trpc-error";

/**
 * 自分メモのアイテムを更新する
 */
export const myMemoUpdateItem = protectedProcedure.input(UpdateMyMemoItemInput).mutation(async ({ ctx, input }) => {
  const myMemoItem = await ctx.prisma.myMemoItem.findUnique({ where: { id: input.myMemoItemId } });
  if (myMemoItem === null || myMemoItem.userId != ctx.user.userId) {
    throw notFoundError;
  }

  return await ctx.prisma.myMemoItem.update({
    where: { id: myMemoItem.id },
    data: {
      content: input.content,
      isChecked: input.isChecked,
    },
  });
});
