import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { deleteImageInCloudinary, uploadImageToCloudinary } from "../utils/cloudinary";
import { updateMyRecipeInput } from "./api-schema";

/**
 * マイレシピを編集する
 */
export const updateMyRecipe = protectedProcedure.input(updateMyRecipeInput).mutation(async ({ ctx, input }) => {
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

  // cloudinaryの画像を更新
  await Promise.all(recipe.images.map((image) => deleteImageInCloudinary(image.imageId)));
  const publicIds = input.images ? await Promise.all(input.images.map((image) => uploadImageToCloudinary(image))) : [];

  // requestのJSONをもとに更新処理
  return await ctx.prisma.recipe.update({
    where: {
      id: input.recipeid,
    },
    data: {
      name: input.name,
      ingredients: {
        deleteMany: {},
        createMany: {
          data: input.ingredients.map((title) => ({ title, description: "" })),
        },
      },
      yields: input.yields,
      processes: {
        deleteMany: {},
        createMany: {
          data: input.processes.map((title, index) => ({ order: index + 1, title, description: "" })),
        },
      },
      images: {
        deleteMany: {},
        createMany: {
          data: publicIds.map((publicId) => ({ imageId: publicId })),
        },
      },
      description: input.description ?? "",
      links: {
        deleteMany: {},
        createMany: {
          data: (input.urls ?? []).map((url) => ({ url })),
        },
      },
    },
  });
});
