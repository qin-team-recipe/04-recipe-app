import { publicProcedure } from "../trpc/init-trpc";
import { GetRecipesInput } from "./api-schema";

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
  return recipes;
});
