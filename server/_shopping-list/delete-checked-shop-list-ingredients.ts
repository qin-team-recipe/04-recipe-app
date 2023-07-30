import { protectedProcedure } from "../trpc/init-trpc";
import { ShopListRecipeIdInput } from "./api-schema";

/**
 * 買い物リストのレシピの材料のうち、チェックしたものを削除する
 */
export const deleteCheckedShopListIngredients = protectedProcedure
  .input(ShopListRecipeIdInput)
  .mutation(async () => {});
