import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { ChefIdInput } from "./api-schema";

/**
 * シェフの情報を取得する
 */
export const getChef = publicProcedure.input(ChefIdInput).query(async ({ ctx, input }) => {
  const [chef, recipes] = await Promise.all([
    ctx.prisma.chef.findUnique({
      where: { id: input.chefId },
      select: {
        id: true,
        displayName: true,
        bio: true,
        links: true,
        _count: {
          select: {
            followers: true,
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
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { id: "desc" },
    }),
  ]);
  if (chef === null) throw notFoundError;

  const { _count, ...chefData } = chef;

  return {
    ...chefData,
    followerCount: _count.followers,
    // TODO: ログイン中の場合は、フォローしているかどうかを計算する
    isFollowing: false,
    recipes: recipes.map(({ _count, ...recipe }) => ({
      ...recipe,
      favoriteCount: _count.favorites,
    })),
  };
});
