import MyRecipeHero from "@/app/components/MyRecipe/MyRecipeHero";
// import { trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Recipes",
  description: "Generated by create next app",
};

export default async function MyRecipeLinks({ params }: { params: { id: string } }) {
  //   const recipeId = params.id;
  //   const recipe = await trpcCaller.recipe({ recipeId });

  //   const text = recipe.processes
  //     .map((process) => {
  //       return `${process.order} ${process.title} ${process.description}`;
  //     })
  //     .join("\n");

  const recipe = {
    id: "1",
    name: "トマトとルッコラのマルゲリータピザに合うホワイトソース",
    description: "トマトとルッコラのマルゲリータピザに合うホワイトソースの作り方を紹介します。",
    _count: {
      favorites: 1,
    },
  };

  return (
    <>
      <MyRecipeHero page="links" recipe={recipe} />
      {/* リンク */}
      <section className="pb-[48px]">
        <ul>
          <li>
            <Link
              href="https://www.youtube.com/"
              target="_blank"
              className="relative border-b-[1px] border-border pl-[16px] pr-[52px] py-[12px] block"
            >
              <div className="flex gap-x-[16px] items-center">
                <Image src="/images/youtube.png" width={36} height={36} alt="twitter" />
                <p className="text-title text-[14px]">Youtubeで作り方をみる</p>
              </div>

              <span className="absolute top-1/2 -translate-y-1/2 right-[16px] pl-[20px] stroke-[#908E96] hover:stroke-primary hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.1666 5.83325L5.83331 14.1666M14.1666 5.83325H6.66665M14.1666 5.83325V13.3333"
                    // stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.twitter.com/"
              target="_blank"
              className="relative border-b-[1px] border-border pl-[16px] pr-[52px] py-[12px] block"
            >
              <div className="flex gap-x-[16px] items-center">
                <Image src="/images/twitter.png" width={36} height={36} alt="twitter" />
                <p className="text-title text-[14px]">Twitterで作り方をみる</p>
              </div>

              <span className="absolute top-1/2 -translate-y-1/2 right-[16px] pl-[20px] stroke-[#908E96] hover:stroke-primary hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.1666 5.83325L5.83331 14.1666M14.1666 5.83325H6.66665M14.1666 5.83325V13.3333"
                    // stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              className="relative border-b-[1px] border-border pl-[16px] pr-[52px] py-[12px] block"
            >
              <div className="flex gap-x-[16px] items-center">
                <Image src="/images/ig.png" width={36} height={36} alt="twitter" />
                <p className="text-title text-[14px]">Instagramで作り方をみる</p>
              </div>

              <span className="absolute top-1/2 -translate-y-1/2 right-[16px] pl-[20px] stroke-[#908E96] hover:stroke-primary hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.1666 5.83325L5.83331 14.1666M14.1666 5.83325H6.66665M14.1666 5.83325V13.3333"
                    // stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              className="relative border-b-[1px] border-border pl-[16px] pr-[52px] py-[12px] block"
            >
              <div className="flex gap-x-[16px] items-center">
                <Image src="/images/link.png" width={36} height={36} alt="twitter" />
                <div>
                  <p className="text-title text-[14px]">サイト名</p>
                  <p className="text-[10px] mt-[4px]">https://hogehoge.com/</p>
                </div>
              </div>
              <span className="absolute top-1/2 -translate-y-1/2 right-[16px] pl-[20px] stroke-[#908E96] hover:stroke-primary hover:text-primary">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.1666 5.83325L5.83331 14.1666M14.1666 5.83325H6.66665M14.1666 5.83325V13.3333"
                    // stroke="#6F6E77"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
