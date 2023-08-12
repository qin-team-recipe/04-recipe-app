import { protectedProcedure } from "../trpc/init-trpc";
import { cloudinary } from "../utils/cloudinary";
import { createMyRecipeInput } from "./api-schema";

/**
 * マイレシピを新規登録する
 */
export const createMyRecipe = protectedProcedure.input(createMyRecipeInput).mutation(async ({ ctx, input }) => {
  //Cloudinaryへの登録処理
  //TODO 複数登録対応
  async function uploadImageToCloudinary(dataURI: string): Promise<string> {
    const result = await cloudinary.v2.uploader.upload(dataURI);
    return result.public_id;
  }

  const publicids: string[] = [];
  for (const dataURI of input.images) {
    const publicid = await uploadImageToCloudinary(dataURI)
      .then((publicid) => publicids.push(publicid))
      .catch((e) => {
        if (e instanceof Error) {
          console.error(e.message);
        }
      });
  }

  //requestのJSONをもとにマイレシピ登録
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
          data: publicids.map((pubulicid) => ({ imageId: pubulicid })),
        },
      },
      description: input.description ?? "",
      links: {
        createMany: {
          data: input.urls.map((url) => ({ url })),
        },
      },
    },
  });
});
