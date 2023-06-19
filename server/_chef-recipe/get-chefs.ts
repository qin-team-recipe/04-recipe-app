import { publicProcedure } from "../trpc/init-trpc";
import { getImageUrl } from "../utils/cloudinary";

export const getChefs = publicProcedure.query(async ({ ctx }) => {
  const chefs = await ctx.prisma.chef.findMany({
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
