import { prisma } from "../prisma";

export async function chefLinkSeeder() {
  const chef = await prisma.chef.findFirstOrThrow();

  await prisma.chefLink.createMany({
    data: [
      // Twitter
      { chefId: chef.id, url: "https://twitter.com/shimabu_it", siteName: "Twitter", followerCount: 19800 },
      // Instagram
      {
        chefId: chef.id,
        url: "https://www.instagram.com/shimabu_it",
        siteName: "Instagram",
        followerCount: 2128,
      },
      // Youtube
      {
        chefId: chef.id,
        url: "https://www.youtube.com/@shimabu_it",
        siteName: "Youtube",
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
