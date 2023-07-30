import { Prisma } from "@prisma/client";
import { CreatedShopListRecipe } from "./shop-list-recipe-core";

/**
 * 買い物リストのレシピを取得する（ない場合は作成する）
 */
export async function findOrCreateShopListRecipe({
  prisma,
  userId,
  recipeId,
}: {
  prisma: Prisma.TransactionClient;
  userId: string;
  recipeId: string;
}): Promise<CreatedShopListRecipe> {
  const shopListRecipe = await prisma.shopListRecipe.findUnique({
    where: {
      userId_recipeId: { userId, recipeId },
    },
    include: { shopListIngredients: true },
  });
  if (shopListRecipe !== null) return shopListRecipe;

  return await prisma.shopListRecipe.create({
    data: { userId, recipeId },
    include: { shopListIngredients: true },
  });
}
