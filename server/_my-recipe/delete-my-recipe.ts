import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { deleteImageInCloudinary } from "../utils/cloudinary";
import { deleteMyRecipeInput } from "./api-schema";

/**
 * マイレシピを削除する
 */
export const deleteMyRecipe = protectedProcedure.input(deleteMyRecipeInput).mutation(async ({ ctx, input }) => {
  //存在チェック・画像とuserIDの取得
  const recipe = await ctx.prisma.recipe.findUnique({
    where: {
      id: input.recipeid,
    },
    select: {
      images: {
        select: { imageId: true },
      },
      myRecipe: {
        select: { userId: true },
      },
    },
  });
  // userIDが一致しているかのチェック
  if (recipe === null || recipe.myRecipe?.userId !== ctx.user.userId) throw notFoundError;

  // cloudinaryの画像を削除
  await Promise.all(recipe.images.map((image) => deleteImageInCloudinary(image.imageId)));

  // requestのJSONをもとに削除処理
  return await ctx.prisma.recipe.delete({
    where: {
      id: input.recipeid,
    },
  });
});
