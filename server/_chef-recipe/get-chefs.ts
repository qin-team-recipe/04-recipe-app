import { publicProcedure } from "../trpc/init-trpc";
import { getImageUrl } from "../utils/cloudinary";
import { SearchInput } from "./api-schema";

/**
 * シェフの一覧を取得する
 */
export const getChefs = publicProcedure.input(SearchInput).query(async ({ ctx, input }) => {
  const chefs = await ctx.prisma.chef.findMany({
    where: {
      OR: [
        {
          displayName: {
            contains: input.search,
          },
        },
        {
          bio: {
            contains: input.search,
          },
        },
      ],
    },
    select: {
      id: true,
      displayName: true,
      bio: true,
      profileImage: true,
      _count: { select: { recipes: true } },
    },
    orderBy: {
      displayName: "asc",
    },
  });

  return chefs.map(({ profileImage, _count, ...chef }) => ({
    ...chef,
    profileImageUrl: getImageUrl(profileImage),
    recipeCount: _count.recipes,
  }));
});
