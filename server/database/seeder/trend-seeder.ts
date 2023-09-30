import { saveChefTrends } from "@/server/_chef-recipe/save-chef-trends";
import { prisma } from "../prisma";
import { saveRecipeTrends } from "@/server/_chef-recipe/save-recipe-trends";

export async function trendSeeder() {
  await Promise.all([saveChefTrends(prisma), saveRecipeTrends(prisma)]);
}
