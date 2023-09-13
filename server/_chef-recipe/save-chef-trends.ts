import { PrismaClient } from "@prisma/client";
import { prisma } from "../database/prisma";

type ChefTrend = {
  chefId: string;
  /** 獲得フォロワー数 */
  newFollowers: number;
};

/**
 * 注目のシェフを計算する。注目のシェフは、直近3日間の獲得フォロワー数の上位10人。
 */
async function calculateChefTrends(prisma: PrismaClient): Promise<ChefTrend[]> {
  const chefs = await prisma.$queryRaw<ChefTrend[]>`
    select
      chefId,
      count(chefId) as newFollowers
    from
      Following
    -- TODO: 直近3日間での絞り込み
    group by
      chefId
    order by
      newFollowers desc
    limit 10;
  `;

  return chefs;
}

/**
 * 注目のシェフを計算して、データベースに保存する
 */
export async function saveChefTrends(): Promise<void> {
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
