import { GeneralUser, publicProcedure } from "../trpc/init-trpc";

export const getCurrentUser = publicProcedure.query(() => {
  const user: GeneralUser = {
    id: "user",
    type: "general",
  };
  return user;
});
