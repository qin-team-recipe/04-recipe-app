import { protectedProcedure } from "../trpc/init-trpc";

export const getCurrentUser = protectedProcedure.query(({ ctx }) => {
  return ctx.user;
});
