import { protectedProcedure } from "../trpc/init-trpc";

export const myMemoGetItems = protectedProcedure.query(async ({ ctx }) => {
  const items = await ctx.prisma.myMemoItem.findMany({
    where: {
      userId: ctx.user.userId,
    },
    select: {
      id: true,
      content: true,
      isChecked: true,
      sortOrder: true,
    },
    orderBy: { sortOrder: "asc" },
  });

  return items.map((item) => ({
    id: item.id,
    name: item.content,
    isChecked: item.isChecked,
    sortOrder: item.sortOrder,
  }));
});
