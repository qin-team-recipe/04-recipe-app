import { protectedProcedure } from "../trpc/init-trpc";
import { AppendShopListIngredientInput } from "./api-schema";

/**
 * 買い物リストのレシピに、材料を追加する
 */
export const appendShopListIngredient = protectedProcedure
  .input(AppendShopListIngredientInput)
  .mutation(async () => {});
