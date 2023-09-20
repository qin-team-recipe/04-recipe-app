import { saveChefTrends } from "@/server/_chef-recipe/save-chef-trends";
import { prisma } from "../prisma";

export async function trendSeeder() {
  await Promise.all([saveChefTrends(prisma)]);
}
