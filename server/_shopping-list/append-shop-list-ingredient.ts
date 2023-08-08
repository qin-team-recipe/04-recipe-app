import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { AppendShopListIngredientInput } from "./api-schema";
import { addIngredientToList } from "./shop-list-recipe-core";

/**
 * 買い物リストのレシピに、材料を追加する
 */
export const appendShopListIngredient = protectedProcedure
  .input(AppendShopListIngredientInput)
  .mutation(async ({ ctx, input }) => {
    const shopListRecipe = await ctx.prisma.shopListRecipe.findUnique({
      where: { id: input.shopListRecipeId },
      include: { shopListIngredients: true },
    });
    if (shopListRecipe === null) {
      throw notFoundError;
    }

    const ingredient = await ctx.prisma.$transaction(async (tx) => {
      // 買い物リストの材料を、追加されていなければ追加する
      const newIngredient = addIngredientToList(shopListRecipe, {
        name: input.name,
        recipeIngredientId: null,
      });

      if (newIngredient === null) {
        return null;
      }
      return await tx.shopListIngredient.create({
        data: {
          shopListRecipeId: shopListRecipe.id,
          recipeIngredientId: newIngredient.recipeIngredientId,
          name: newIngredient.name,
          isChecked: newIngredient.isChecked,
          sortOrder: newIngredient.sortOrder,
        },
      });
    });

    return ingredient;
  });
