import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

type RecipeTrend = {
  RecipeId: string;
  /** 獲得お気に入り数 */
  newFavorites: number;
};

type RecipeTrendRaw = {
  RecipeId: string;
  /** 獲得お気に入り数 */
  newFavorites: bigint;
};

const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

/**
 * レシピのトレンドを計算する。トレンドは直近3日間の獲得お気に入り数が基準。上位10個が話題のレシピになる。
 */
async function calculateRecipeTrends(prisma: PrismaClient): Promise<RecipeTrend[]> {
  const Recipes = await prisma.$queryRaw<RecipeTrendRaw[]>`
    with LatestFavorite as (
      select
        *
      from
        Favorite
      where
        createdAt > ${dayjs().subtract(3, "days").format(dateTimeFormat)}
    )
    select
      Recipe.id as RecipeId,
      count(Favorite.id) as newFavorites
    from
      Recipe
      left outer join LatestFavorite Favorite
      on Recipe.id = Favorite.RecipeId
    group by
      Recipe.id
    order by
      newFavorites desc
    limit 10
  `;

  return Recipes.map((Recipe) => ({ RecipeId: Recipe.RecipeId, newFavorites: Number(Recipe.newFavorites) }));
}

/**
 * レシピのトレンドを計算して、データベースに保存する
 */
export async function saveRecipeTrends(prisma: PrismaClient): Promise<void> {
  const recipeTrends = await calculateRecipeTrends(prisma);

  // 運用するまではトレンドの履歴は不要のため、最新のトレンドのみ保存する
  await prisma.$transaction(async (tx) => {
    await tx.recipeTrend.deleteMany();

    await tx.recipeTrend.createMany({
      data: recipeTrends.map((trend) => ({
        recipeId: trend.RecipeId,
        newFavorites: trend.newFavorites,
      })),
    });
  });
}
