import { protectedProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { UpdateShopListIngredientInput } from "./api-schema";

/**
 * 買い物リストの材料を更新する（チェックをトグルする、名前を変更する）
 */
export const updateShopListIngredient = protectedProcedure
  .input(UpdateShopListIngredientInput)
  .mutation(async ({ ctx, input }) => {
    const shopListIngredient = await ctx.prisma.shopListIngredient.findUnique({
      where: { id: input.shopListIngredientId },
    });
    if (shopListIngredient === null) throw notFoundError;

    return await ctx.prisma.shopListIngredient.update({
      where: { id: input.shopListIngredientId },
      data: {
        isChecked: input.isChecked,
        name: input.name,
      },
      select: { id: true, isChecked: true, name: true },
    });
  });
