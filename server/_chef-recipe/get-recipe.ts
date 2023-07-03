import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { RecipeIdInput } from "./api-schema";

/**
 * レシピの情報を取得する
 */
export const getRecipe = publicProcedure.input(RecipeIdInput).query(async ({ ctx, input }) => {
  const recipe = await ctx.prisma.recipe.findUnique({
    where: { id: input.recipeId },
      select: {
        id: true,
        name: true,
        description: true,
        yields:true,
        chefRecipe:{
          select:{
           chef:true
        }},
        myRecipe:{
          select:{
           user:true
        }},
        _count: { select: { favorites: true } },
        images: true,
        ingredients:true,
        processes:true,
        links:true,
      },
    })
  if (recipe === null) throw notFoundError;
  return recipe;
});
