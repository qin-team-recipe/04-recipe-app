// import { trpcClient } from "@/app/utils/trpc";
import { ChefsRecipeCard } from "@/app/components/Chef/ChefsRecipeCard";
import { MyPageNavigation } from "../MyPageNavigation";
import MyPageHero from "@/app/components/MyPage/MyPageHero";
import CreateMyRecipeButton from "@/app/components/MyPage/CreateMyRecipeButton";

export const metadata = {
  title: "Chef",
  description: "Generated by create next app",
};

export default async function MyPageHotRecipes({ params }: { params: { userId: string } }) {
  const userId = params.userId;

  // ダミー。あとで消す
  const user = {
    id: "foobarid",
    displayName: "山田シェフ",
    bio: "初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！ 絶賛発売中！",
    followerCount: 123,
    recipeCount: 456,
    profileImageUrl: "/images/favChef.png",
    links: {
      youtube: {
        url: "https://www.youtube.com/channel/UCJFp8uSYCjXOMnkUyb3CQ3Q",
        siteName: "Youtube",
      },
      instagram: {
        url: "https://www.instagram.com/ryuji_ryuji_ryuji/",
        siteName: "Instagram",
      },
    },
    recipes: [
      {
        id: "1",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "2",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "3",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "4",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "5",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "6",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
    ],
    popularRecipes: [
      {
        id: "1",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "2",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "3",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "4",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "5",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
      {
        id: "6",
        name: "レシピタイトル",
        description: "レシピの説明文",
        imageUrl: "/images/top/recipes/recipe1.png",
        favoriteCount: 123,
      },
    ],
  };

  return (
    <div className="relative">
      <MyPageHero user={user} userId={userId} />
      <MyPageNavigation userId={userId} page="hotrecipes" />
      <section className="pt-[20px] px-[15px] pb-[48px]">
        {user?.popularRecipes?.length === 0 ? (
          <p className="text-title">人気レシピがまだありません！</p>
        ) : (
          <ul className="flex justify-between gap-y-[16px] gap-x-[12px] flex-wrap">
            {user.popularRecipes.map((recipe) => (
              <ChefsRecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        )}
      </section>
      <CreateMyRecipeButton />
    </div>
  );
}
