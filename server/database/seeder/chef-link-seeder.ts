import { prisma } from "../prisma";

export async function chefLinkSeeder() {
  const chef = await prisma.chef.findFirstOrThrow();

  await prisma.chefLink.createMany({
    data: [
      // Twitter
      { chefId: chef.id, url: "https://twitter.com/shimabu_it", siteName: "しまぶーのIT大学", followerCount: 19800 },
      // Instagram
      {
        chefId: chef.id,
        url: "https://www.instagram.com/shimabu_it",
        siteName: "しまぶーのIT大学",
        followerCount: 2128,
      },
      // Youtube
      {
        chefId: chef.id,
        url: "https://www.youtube.com/@shimabu_it",
        siteName: "しまぶーのIT大学",
        followerCount: 117000,
      },
      // Webサイト
      {
        chefId: chef.id,
        url: "http://example.com",
        siteName: "しまぶーのIT大学",
      },
    ],
  });
}
