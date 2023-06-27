import { publicProcedure } from "../trpc/init-trpc";

export const getRecipes = publicProcedure.query(async ({ ctx }) => {
  const recipes = await ctx.prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      _count: { select: { favorites: true } },
    },
    where: {
      chefRecipe: {
        isNot: null,
      },
    },
  });
  return recipes;
});
