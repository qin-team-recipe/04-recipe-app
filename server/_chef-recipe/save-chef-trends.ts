import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";

type ChefTrend = {
  chefId: string;
  /** 獲得フォロワー数 */
  newFollowers: number;
};

type ChefTrendRaw = {
  chefId: string;
  /** 獲得フォロワー数 */
  newFollowers: bigint;
};

const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";

/**
 * シェフのトレンドを計算する。トレンドは直近3日間の獲得フォロワー数が基準。上位10名が注目のシェフになる。
 */
async function calculateChefTrends(prisma: PrismaClient): Promise<ChefTrend[]> {
  const chefs = await prisma.$queryRaw<ChefTrendRaw[]>`
    with LatestFollowing as (
      select
        *
      from
        Following
      where
        createdAt > ${dayjs().subtract(3, "days").format(dateTimeFormat)}
    )
    select
      Chef.id as chefId,
      count(Following.id) as newFollowers
    from
      Chef
      left outer join LatestFollowing Following
      on Chef.id = Following.chefId
    group by
      Chef.id
    order by
      newFollowers desc
    limit 10
  `;

  return chefs.map((chef) => ({ chefId: chef.chefId, newFollowers: Number(chef.newFollowers) }));
}

/**
 * シェフのトレンドを計算して、データベースに保存する
 */
export async function saveChefTrends(prisma: PrismaClient): Promise<void> {
  const chefTrends = await calculateChefTrends(prisma);

  // 運用するまではトレンドの履歴は不要のため、最新のトレンドのみ保存する
  await prisma.$transaction(async (tx) => {
    await tx.chefTrend.deleteMany();

    await tx.chefTrend.createMany({
      data: chefTrends.map((trend) => ({
        chefId: trend.chefId,
        newFollowers: trend.newFollowers,
      })),
    });
  });
}
