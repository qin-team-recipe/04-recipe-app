import { UserIdInput } from "../_my-recipe/api-schema";
import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { getRecipeImageUrlFromImages } from "./recipe-util";

/**
 * 一般シェフの情報を取得する
 */
export const getGeneralChef = publicProcedure.input(UserIdInput).query(async ({ ctx, input }) => {
  const [chef, recipes, popularRecipes] = await Promise.all([
    ctx.prisma.user.findUnique({
      where: { id: input.userId },
      select: {
        id: true,
        name: true,
        image: true,
        _count: {
          select: {
            myRecipes: true,
          },
        },
      },
    }),
    ctx.prisma.recipe.findMany({
      where: {
        myRecipe: { userId: input.userId },
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: {
          select: { imageId: true },
          take: 1,
        },
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { id: "desc" },
      take: 10,
    }),
    ctx.prisma.recipe.findMany({
      where: {
        myRecipe: { userId: input.userId },
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: {
          select: { imageId: true },
          take: 1,
        },
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { favorites: { _count: "desc" } },
      take: 10,
    }),
  ]);
  if (chef === null) throw notFoundError;

  const { image, _count, ...chefData } = chef;
  return {
    ...chefData,
    // プロフィール画像を変更している場合（Cloudinaryの画像IDを保存している場合）は、Cloudinaryの画像URLを返す
    profileImageUrl: image,
    recipeCount: _count.myRecipes,
    recipes: recipes.map(({ _count, images, ...recipe }) => ({
      ...recipe,
      imageUrl: getRecipeImageUrlFromImages(images),
      favoriteCount: _count.favorites,
    })),
    popularRecipes: popularRecipes.map(({ _count, images, ...recipe }) => ({
      ...recipe,
      imageUrl: getRecipeImageUrlFromImages(images),
      favoriteCount: _count.favorites,
    })),
  };
});
