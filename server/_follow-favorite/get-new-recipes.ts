import { getRecipeImageUrlFromImages } from "../_chef-recipe/recipe-util";
import { protectedProcedure } from "../trpc/init-trpc";

// TODO: 一般ユーザーもフォローできる仕様に対応する

/**
 * フォローしているシェフの新着レシピを取得する
 */
export const getNewRecipes = protectedProcedure.query(async ({ ctx }) => {
  const followingChefIds = (
    await ctx.prisma.following.findMany({
      where: { userId: ctx.user.userId },
      select: { chefId: true },
    })
  ).map(({ chefId }) => chefId);
  const recipes = await ctx.prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      _count: { select: { favorites: true } },
      chefRecipe: {
        select: { chef: true },
      },
    },
    where: {
      chefRecipe: {
        chefId: { in: followingChefIds },
      },
    },
    orderBy: { id: "desc" },
    // TODO: 取得する件数を決める
    take: 20,
  });

  return recipes.map(({ _count, images, chefRecipe, ...recipe }) => ({
    ...recipe,
    imageUrl: getRecipeImageUrlFromImages(images),
    favoriteCount: _count.favorites,
    author: chefRecipe === null ? null : chefRecipe.chef,
  }));
});
