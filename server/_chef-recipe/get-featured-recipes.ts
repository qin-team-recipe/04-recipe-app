import { publicProcedure } from "../trpc/init-trpc";
import { getRecipeImageUrlFromImages } from "./recipe-util";

type RecipeResponse = {
  id: string;
  name: string;
  imageUrl: string | null;
  favoriteCount: number;
  chef: {
    displayName: string;
  } | null;
};

/**
 * 話題のレシピを取得する
 */
export const getFeaturedRecipe = publicProcedure.query(async ({ ctx }): Promise<RecipeResponse[]> => {
  const trends = await ctx.prisma.recipeTrend.findMany({
    select: {
      recipe: {
        select: {
          id: true,
          name: true,
          description: true,
          images: true,
          _count: { select: { favorites: true } },
          chefRecipe: { select: { chef: { select: { displayName: true } } } },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return trends.map(({ recipe }) => ({
    id: recipe.id,
    name: recipe.name,
    imageUrl: getRecipeImageUrlFromImages(recipe.images),
    favoriteCount: recipe._count.favorites,
    chef: recipe.chefRecipe === null ? null : recipe.chefRecipe.chef,
  }));
});
