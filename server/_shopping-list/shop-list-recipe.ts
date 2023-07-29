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
import {
  CreatedShopListRecipe,
  addIngredientToList as addIngredientToListCore,
  convertRecipeIngredientsForShopList,
} from "./shop-list-recipe-core";
import { Prisma } from "@prisma/client";
import { notFoundError } from "../trpc/trpc-error";

async function findOrCreateShopListRecipe({
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

/**
 * 全ての材料を買い物リストに追加する
 */
export const addAllIngredientsToList = protectedProcedure.input(RecipeIdInput).mutation(async ({ ctx, input }) => {
  // レシピを取得する
  const recipe = await ctx.prisma.recipe.findUnique({
    where: { id: input.recipeId },
    include: { ingredients: true },
  });
  if (recipe === null) {
    throw notFoundError;
  }

  // レシピの材料を、買い物リストの中のレシピの材料に変換する
  const shopListIngredients = convertRecipeIngredientsForShopList(recipe.ingredients);

  // 買い物リストのレシピが存在しなければ作成する。それから、買い物リストの材料を追加する。
  await ctx.prisma.$transaction(async (tx) => {
    const shopListRecipe = await findOrCreateShopListRecipe({
      prisma: tx,
      userId: ctx.user.userId,
      recipeId: recipe.id,
    });

    // レシピの材料を、削除してから登録する
    await tx.shopListIngredient.deleteMany({
      where: { shopListRecipeId: shopListRecipe.id },
    });
    await tx.shopListIngredient.createMany({
      data: shopListIngredients.map((ingredient) => ({
        shopListRecipeId: shopListRecipe.id,
        recipeIngredientId: ingredient.recipeIngredientId,
        name: ingredient.name,
        isChecked: ingredient.isChecked,
        sortOrder: ingredient.sortOrder,
      })),
    });
  });
});

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
          shopListRecipeId: shopListRecipe.id,
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
export const removeIngredientFromList = protectedProcedure.input(IngredientIdInput).mutation(async ({ ctx, input }) => {
  // 材料が存在することを確認する
  const ingredient = await ctx.prisma.recipeIngredient.findUnique({ where: { id: input.ingredientId } });
  if (ingredient === null) {
    throw new TRPCError({ code: "BAD_REQUEST", message: "IDに該当する材料が存在しません" });
  }

  const recipeInShopList: CreatedShopListRecipe | null = await ctx.prisma.shopListRecipe.findUnique({
    where: { userId_recipeId: { userId: ctx.user.userId, recipeId: ingredient.recipeId } },
    include: { shopListIngredients: true },
  });

  // 材料が買い物リストにない場合は何もしない
  if (recipeInShopList === null) {
    // 買い物リストにレシピそのものがない場合
    return;
  }
  const ingredientInShopList = recipeInShopList.shopListIngredients.find(
    (item) => item.recipeIngredientId === ingredient.id
  );
  if (ingredientInShopList === undefined) {
    // 買い物リストに材料が追加されていない場合
    return;
  }

  // 材料が買い物リストにある場合は削除する。買い物リストのレシピの材料が空になれば、買い物リストからレシピを削除する。
  await ctx.prisma.$transaction(async (tx) => {
    await tx.shopListIngredient.delete({ where: { id: ingredientInShopList.id } });

    if (recipeInShopList.shopListIngredients.length === 1) {
      await tx.shopListRecipe.delete({ where: { id: recipeInShopList.id } });
    }
  });
});

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
