import { protectedProcedure } from "../trpc/init-trpc";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { createMyRecipeInput } from "./api-schema";

/**
 * マイレシピを新規登録する
 */
export const createMyRecipe = protectedProcedure.input(createMyRecipeInput).mutation(async ({ ctx, input }) => {
  // TODO: 画像を複数登録した場合にエラーになることがある（Macでは動作しました）
  const publicIds = await Promise.all(input.images.map((image) => uploadImageToCloudinary(image)));

  // requestのJSONをもとにマイレシピ登録
  return await ctx.prisma.recipe.create({
    data: {
      name: input.name,
      ingredients: {
        createMany: {
          data: input.ingredients.map((title) => ({ title, description: "" })),
        },
      },
      yields: input.yields,
      processes: {
        createMany: {
          data: input.processes.map((title, index) => ({ order: index + 1, title, description: "" })),
        },
      },
      images: {
        createMany: {
          data: publicIds.map((pubulicid) => ({ imageId: pubulicid })),
        },
      },
      description: input.description ?? "",
      links: {
        createMany: {
          data: input.urls.map((url) => ({ url })),
        },
      },
      myRecipe: {
        create: {
          userId: ctx.user.userId,
        },
      },
    },
  });
});
