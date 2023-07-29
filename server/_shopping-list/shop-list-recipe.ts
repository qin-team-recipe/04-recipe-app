import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../trpc/init-trpc";
import {
  RecipeIdInput,
  IngredientIdInput,
  UpdateShopListIngredientInput,
  ShopListIngredientIdInput,
  ShopListRecipeIdInput,
  AppendShopListIngredientInput,
} from "./api-schema";
import { ShopListRecipe, addIngredientToList as addIngredientToListCore } from "./shop-list-recipe-core";
import { Prisma } from "@prisma/client";

/**
 * 全ての材料を買い物リストに追加する
 */
export const addAllIngredientsToList = protectedProcedure.input(RecipeIdInput).mutation(async () => {});

async function findOrCreateShopListRecipe({
  prisma,
  userId,
  recipeId,
}: {
  prisma: Prisma.TransactionClient;
  userId: string;
  recipeId: string;
}): Promise<ShopListRecipe> {
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

/**
 * 材料を買い物リストに追加する
 */
export const addIngredientToList = protectedProcedure.input(IngredientIdInput).mutation(async ({ ctx, input }) => {
  // 材料が存在することを確認する
  const ingredient = await ctx.prisma.recipeIngredient.findUnique({ where: { id: input.ingredientId } });
  if (ingredient === null) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "IDに該当する材料が存在しません" });
  }

  await ctx.prisma.$transaction(async (tx) => {
    // 買い物リストのレシピを、存在しなければ作成する
    const shopListRecipe = await findOrCreateShopListRecipe({
      prisma: tx,
      userId: ctx.user.userId,
      recipeId: ingredient.recipeId,
    });

    // 買い物リストの材料を、追加されていなければ追加する
    const newIngredient = addIngredientToListCore(shopListRecipe, {
      name: ingredient.title,
      recipeIngredientId: ingredient.id,
    });

    if (newIngredient !== null) {
      await tx.shopListIngredient.create({
        data: {
          shopListRecipeId: newIngredient.shopListRecipeId,
          recipeIngredientId: newIngredient.recipeIngredientId,
          name: newIngredient.name,
          isChecked: newIngredient.isChecked,
          sortOrder: newIngredient.sortOrder,
        },
      });
    }
  });
});

/**
 * 材料を買い物リストから削除する
 */
export const removeIngredientFromList = protectedProcedure.input(IngredientIdInput).mutation(async () => {});

/**
 * 買い物リストの材料を更新する（チェックをトグルする、名前を変更する）
 */
export const updateShopListIngredient = protectedProcedure
  .input(UpdateShopListIngredientInput)
  .mutation(async () => {});

/**
 * 買い物リストの材料を削除する
 */
export const deleteShopListIngredient = protectedProcedure.input(ShopListIngredientIdInput).mutation(async () => {});

/**
 * 買い物リストのレシピを削除する
 */
export const deleteShopListRecipe = protectedProcedure.input(ShopListRecipeIdInput).mutation(async () => {});

/**
 * 買い物リストのレシピの材料のうち、チェックしたものを削除する
 */
export const deleteCheckedShopListIngredients = protectedProcedure
  .input(ShopListRecipeIdInput)
  .mutation(async () => {});

/**
 * 買い物リストのレシピに、材料を追加する
 */
export const appendShopListIngredient = protectedProcedure
  .input(AppendShopListIngredientInput)
  .mutation(async () => {});
