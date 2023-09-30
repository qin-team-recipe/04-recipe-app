import { publicProcedure } from "../trpc/init-trpc";
import { getImageUrl } from "../utils/cloudinary";

type ChefResponse = {
  id: string;
  displayName: string;
  bio: string;
  profileImageUrl: string;
  recipeCount: number;
};

/**
 * 注目のシェフを取得する
 */
export const getFeaturedChefs = publicProcedure.query(async ({ ctx }): Promise<ChefResponse[]> => {
  const trends = await ctx.prisma.chefTrend.findMany({
    select: {
      chef: {
        select: {
          id: true,
          displayName: true,
          bio: true,
          profileImage: true,
          _count: { select: { recipes: true } },
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  return trends.map(({ chef }) => ({
    id: chef.id,
    displayName: chef.displayName,
    bio: chef.bio,
    profileImageUrl: getImageUrl(chef.profileImage),
    recipeCount: chef._count.recipes,
  }));
});
