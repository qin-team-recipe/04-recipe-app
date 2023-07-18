import { PrismaClient } from "@prisma/client";
import { Result } from "../utils/result";

/**
 * シェフIDがDBに存在する値か検証する
 */
export async function validateChefId(prisma: PrismaClient, chefId: string): Promise<Result<string, undefined>> {
  if ((await prisma.chef.findUnique({ where: { id: chefId } })) === null) {
    return Result.error(undefined);
  }
  return Result.ok(chefId);
}

/**
 * レシピIDがDBに存在する値か検証する
 */
export async function validateRecipeId(prisma: PrismaClient, recipeId: string): Promise<Result<string, undefined>> {
  if ((await prisma.recipe.findUnique({ where: { id: recipeId } })) === null) {
    return Result.error(undefined);
  }
  return Result.ok(recipeId);
}
