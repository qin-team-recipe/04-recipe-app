import { protectedProcedure } from "../trpc/init-trpc";
import {
  RecipeIdInput,
  IngredientIdInput,
  UpdateShopListIngredientInput,
  ShopListIngredientIdInput,
  ShopListRecipeIdInput,
  AppendShopListIngredientInput,
} from "./api-schema";

/**
 * 全ての材料を買い物リストに追加する
 */
export const addAllIngredientsToList = protectedProcedure.input(RecipeIdInput).mutation(async () => {});

/**
 * 材料を買い物リストに追加する
 */
export const addIngredientToList = protectedProcedure.input(IngredientIdInput).mutation(async () => {});

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
