import { favoriteRecipe } from "../_follow-favorite/favorite-recipe";
import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { getImageUrl } from "../utils/cloudinary";
import { ChefIdInput } from "./api-schema";
import { getRecipeImageUrlFromImages } from "./recipe-util";

/**
 * シェフの情報を取得する
 */
export const getChef = publicProcedure.input(ChefIdInput).query(async ({ ctx, input }) => {
  const [chef, recipes, popularRecipes] = await Promise.all([
    ctx.prisma.chef.findUnique({
      where: { id: input.chefId },
      select: {
        id: true,
        displayName: true,
        bio: true,
        links: true,
        profileImage: true,
        _count: {
          select: {
            followers: true,
            recipes: true,
          },
        },
      },
    }),
    ctx.prisma.recipe.findMany({
      where: {
        chefRecipe: { chefId: input.chefId },
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: {
          select: { imageId: true },
          take: 1,
        },
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { id: "desc" },
      take: 10,
    }),
    ctx.prisma.recipe.findMany({
      where: {
        chefRecipe: { chefId: input.chefId },
      },
      select: {
        id: true,
        name: true,
        description: true,
        images: {
          select: { imageId: true },
          take: 1,
        },
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { favorites: { _count: "desc" } },
      take: 10,
    }),
  ]);
  if (chef === null) throw notFoundError;

  const { _count, profileImage, ...chefData } = chef;

  // ログインユーザーがフォローしているかどうか
  const isFollowing =
    ctx.user === undefined
      ? false
      : (await ctx.prisma.following.findUnique({
          where: { userId_chefId: { userId: ctx.user.userId, chefId: input.chefId } },
        })) !== null;

  return {
    ...chefData,
    profileImageUrl: getImageUrl(profileImage),
    recipeCount: _count.recipes,
    followerCount: _count.followers,
    isFollowing,
    recipes: recipes.map(({ _count, images, ...recipe }) => ({
      ...recipe,
      imageUrl: getRecipeImageUrlFromImages(images),
      favoriteCount: _count.favorites,
    })),
    popularRecipes: popularRecipes.map(({ _count, images, ...recipe }) => ({
      ...recipe,
      imageUrl: getRecipeImageUrlFromImages(images),
      favoriteCount: _count.favorites,
    })),
  };
});
