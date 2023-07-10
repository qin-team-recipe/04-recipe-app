import { publicProcedure } from "../trpc/init-trpc";
import { GetRecipesInput } from "./api-schema";
import { getRecipeImageUrlFromImages } from "./recipe-util";

export const getRecipes = publicProcedure.input(GetRecipesInput).query(async ({ ctx, input }) => {
  const recipes = await ctx.prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      _count: { select: { favorites: true } },
    },
    where: {
      chefRecipe: { isNot: null },
      ...(input.search === undefined
        ? {}
        : {
            OR: [{ name: { contains: input.search } }, { description: { contains: input.search } }],
          }),
    },
  });

  return recipes.map(({ _count, ...recipe }) => ({
    ...recipe,
    imageUrl: getRecipeImageUrlFromImages(recipe.images),
    favoriteCount: _count.favorites,
  }));
});
