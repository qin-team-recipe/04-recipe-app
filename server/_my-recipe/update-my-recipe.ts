import { protectedProcedure } from "../trpc/init-trpc";
import { uploadImageToCloudinary } from "../utils/cloudinary";
import { updateMyRecipeInput } from "./api-schema";

/**
 * マイレシピを編集する
 */
export const updateMyRecipe = protectedProcedure.input(updateMyRecipeInput).mutation(async ({ ctx, input }) => {
  //cloudinaryの画像を更新
  const publicIds = await Promise.all(input.images.map((image) => uploadImageToCloudinary(image)));

  // requestのJSONをもとに更新処理
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

  //参考　登録処理
  // return await ctx.prisma.recipe.create({
  //   data: {
  //     name: input.name,
  //     ingredients: {
  //       createMany: {
  //         data: input.ingredients.map((title) => ({ title, description: "" })),
  //       },
  //     },
  //     yields: input.yields,
  //     processes: {
  //       createMany: {
  //         data: input.processes.map((title, index) => ({ order: index + 1, title, description: "" })),
  //       },
  //     },
  //     images: {
  //       createMany: {
  //         data: publicIds.map((pubulicid) => ({ imageId: pubulicid })),
  //       },
  //     },
  //     description: input.description ?? "",
  //     links: {
  //       createMany: {
  //         data: input.urls.map((url) => ({ url })),
  //       },
  //     },
  //     myRecipe: {
  //       create: {
  //         userId: ctx.user.userId,
  //       },
  //     },
  //   },
  // });
});
