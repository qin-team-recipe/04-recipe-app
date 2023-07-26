import { protectedProcedure } from "../trpc/init-trpc";

/**
 * ユーザーが退会する
 */
export const deleteUser = protectedProcedure.mutation(async ({ ctx }) => {
  const deletedUser = await ctx.prisma.$transaction(async (tx) => {
    const userId = ctx.user.userId;
    await Promise.all([
      // フォローを削除する
      tx.following.deleteMany({ where: { userId } }),
      // お気に入りを削除する
      tx.favorite.deleteMany({ where: { userId } }),
      // マイレシピを削除する
      tx.myRecipe.deleteMany({ where: { userId } }),
      // TODO: 買い物リストに関する情報を削除する
      // アカウントを削除する
      tx.account.deleteMany({ where: { userId } }),
    ]);
    return await tx.user.delete({ where: { id: userId } });
  });
  return deletedUser;
});
