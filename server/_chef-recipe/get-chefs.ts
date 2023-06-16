import { publicProcedure } from "../trpc/init-trpc";

export const getChefs = publicProcedure.query(async ({ ctx }) => {
  const chefs = await ctx.prisma.chef.findMany();

  return chefs;
});
