type ChefTrend = {
  chefId: string;
  /** 獲得フォロワー数 */
  newFollowers: number;
};

/**
 * 注目のシェフを計算する。注目のシェフは、直近3日間の獲得フォロワー数の上位10人。
 */
async function calculateFeaturedChefs(): Promise<ChefTrend[]> {
  return [];
}

/**
 * 注目のシェフを計算して、データベースに保存する
 */
export async function saveChefTrends(): Promise<void> {
  const chefs = await calculateFeaturedChefs();
}
