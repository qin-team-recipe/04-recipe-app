import { getRecipeAuthor, getRecipeImageUrlFromImages } from "../_chef-recipe/recipe-util";
import { protectedProcedure } from "../trpc/init-trpc";

/**
 * お気に入りレシピの一覧を取得する
 */
export const getFavoriteRecipes = protectedProcedure.query(async ({ ctx }) => {
  const favorites = await ctx.prisma.favorite.findMany({
    where: { userId: ctx.user.userId },
    select: {
      recipe: {
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          _count: { select: { favorites: true } },
          chefRecipe: {
            select: { chef: { select: { id: true, displayName: true } } },
          },
          myRecipe: {
            select: { user: { select: { id: true, name: true } } },
          },
        },
      },
    },
    orderBy: { id: "desc" },
  });
  const favoriteRecipes = favorites.map(({ recipe: { _count, images, chefRecipe, myRecipe, ...recipe } }) => ({
    ...recipe,
    imageUrl: getRecipeImageUrlFromImages(images),
    favoriteCount: _count.favorites,
    author: getRecipeAuthor({ chef: chefRecipe?.chef ?? null, user: myRecipe?.user ?? null }),
  }));

  return favoriteRecipes;
});
