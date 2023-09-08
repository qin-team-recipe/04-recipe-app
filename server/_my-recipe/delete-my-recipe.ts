import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { deleteMyRecipeInput } from "./api-schema";

/**
 * マイレシピを削除する
 */
export const deleteMyRecipe = protectedProcedure.input(deleteMyRecipeInput).mutation(async ({ ctx, input }) => {
  //存在チェック・画像とuserIDの取得
  const myRecipe = await ctx.prisma.myRecipe.findUnique({
    where: {
      recipeId: input.myrecipeid,
    },
  });

  // userIDが一致しているかのチェック
  if (myRecipe === null || myRecipe.userId !== ctx.user.userId) throw notFoundError;

  // requestのJSONをもとに削除処理
  return await ctx.prisma.myRecipe.delete({
    where: {
      recipeId: input.myrecipeid,
    },
  });
});
