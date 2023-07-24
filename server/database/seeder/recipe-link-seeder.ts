import { prisma } from "../prisma";

export async function recipeLinkSeeder() {
  const recipe = await prisma.recipe.findFirstOrThrow();

  await prisma.recipeLink.createMany({
    data: [
      // Twitter
      { recipeId: recipe.id, url: "https://twitter.com/shimabu_it" },
      // Instagram
      { recipeId: recipe.id, url: "https://www.instagram.com/shimabu_it" },
      // Tiktok
      { recipeId: recipe.id, url: "https://www.tiktok.com" },
      // Youtube
      { recipeId: recipe.id, url: "https://www.youtube.com/@shimabu_it" },
      // Webサイト
      { recipeId: recipe.id, url: "http://example.com" },
    ],
  });
}
