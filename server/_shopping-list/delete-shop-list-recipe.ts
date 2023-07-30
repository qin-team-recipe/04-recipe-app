import { protectedProcedure } from "../trpc/init-trpc";
import { ShopListRecipeIdInput } from "./api-schema";

/**
 * 買い物リストのレシピを削除する
 */
export const deleteShopListRecipe = protectedProcedure.input(ShopListRecipeIdInput).mutation(async () => {});
