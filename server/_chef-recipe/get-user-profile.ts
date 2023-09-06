import { publicProcedure } from "../trpc/init-trpc";
import { notFoundError } from "../trpc/trpc-error";
import { GetUserInput } from "./api-schema";

type GetUserResponse = {
  id: string;
  displayName: string;
  recipeCount: number;
};

/**
 * ユーザーのプロフィールを取得する
 */
export const getUser = publicProcedure.input(GetUserInput).query(async ({ ctx, input }): Promise<GetUserResponse> => {
  const user = await ctx.prisma.user.findUnique({
    where: { id: input.userId },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          myRecipes: true,
        },
      },
    },
  });
  if (user === null) throw notFoundError;

  return {
    id: user.id,
    displayName: user.name,
    recipeCount: user._count.myRecipes,
  };
});
