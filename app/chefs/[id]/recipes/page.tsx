import Image from "next/image";
import SideBar from "@/app/components/NavBar/SideBar";
import Link from "next/link";

export const metadata = {
  title: "Chef",
  description: "Generated by create next app",
};

export default function ChefRecipes() {
  return (
    <main className=" pb-[58px] md:pb-[8px] md:max-w-[390px] md:mx-auto md:w-[390px] md:h-auto md:border-x-border md:border-x-[1px] md:relative">
      <div>
        {/* Hero */}
        <div className="relative">
          <Image
            src="/images/ChefHero.png"
            alt="Picture of the recipe"
            width={390}
            height={390}
            style={{ width: "100%", height: "auto" }}
          />

          <button className="stroke-white hover:stroke-primary absolute top-[20px] left-[20px]">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3333 16H6.66666"
                // stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 25.3333L6.66666 16L16 6.66666"
                // stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
          <button className="absolute -bottom-[30px] right-[10px]">
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="30" cy="30" r="30" fill="#E54D2E" />
              <path
                d="M42.63 20.87C41.8775 20.1149 40.9833 19.5157 39.9987 19.1069C39.0142 18.6981 37.9586 18.4876 36.8925 18.4876C35.8264 18.4876 34.7708 18.6981 33.7863 19.1069C32.8017 19.5157 31.9075 20.1149 31.155 20.87L30 22.04L28.845 20.87C28.0925 20.1149 27.1983 19.5157 26.2137 19.1069C25.2292 18.6981 24.1736 18.4876 23.1075 18.4876C22.0414 18.4876 20.9858 18.6981 20.0013 19.1069C19.0167 19.5157 18.1225 20.1149 17.37 20.87C14.19 24.05 13.995 29.42 18 33.5L30 45.5L42 33.5C46.005 29.42 45.81 24.05 42.63 20.87Z"
                stroke="white"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Chef詳細 */}
        <div className="px-[16px] pt-[16px] pb-[18.17px]">
          <h1 className="font-bold text-title text-[27px]">山田シェフ</h1>
          <p className="mt-[16px] text-title text-[16px] leading-snug ">
            初の絵本出版！ 『 まねっこシェフ』 ・ふわふわ！スクランブルエッグ
            ・にぎにぎ！おにぎり 主婦の友社より３月３日、２冊同時発売！
            絶賛発売中！
          </p>
          <p className="pt-[14.17px] text-[16px] leading-snug">
            <span className="text-title font-bold">456</span> フォロワー
          </p>
        </div>

        {/* ナビゲーション */}
        <nav className="border-b-[1px] border-border">
          <ul className="flex text-title">
            <li className="w-1/2 text-center text-[16px] font-bold border-b-[2px]">
              <Link href="/chefs/1/recipes" className="block py-[10px]">
                レシピ
              </Link>
            </li>
            <li className="w-1/2 text-center text-[16px] ">
              <Link href="/chefs/1/links" className="block py-[10px]">
                リンク
              </Link>
            </li>
          </ul>
        </nav>

        {/* レシピ */}
        <section className="pt-[20px] px-[15px] pb-[48px]">
          <p className="font-bold text-title text-[20px] mb-[10px]">123件</p>
          <ul className="flex justify-between gap-y-[16px] gap-x-[12px] flex-wrap">
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
            <li className="w-[calc(50%_-_6px)] h-auto relative">
              <Link href="/">
                <Image
                  src="/images/top/recipes/recipe1.png"
                  alt="シェフの写真"
                  width={173}
                  height={173}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="rounded-[16px] absolute top-[8px] right-[8px] py-[8px] pr-[8px] pl-[25px] text-white text-[15px] leading-none bg-[#040013]/[.48]">
                  <span className="absolute top-1/2 left-[8px] -translate-y-1/2 w-[14px] h-[14px] mt-[1.3px]">
                    <Image
                      src="/images/top/recipes/vector.png"
                      width={14}
                      height={14}
                      alt="vector icon"
                    />
                  </span>
                  1,234
                </div>
                <p className="text-title font-bold mt-[8px] text-[12px]">
                  トマトとルッコラのマルゲリータピザに合うホワイト...
                </p>
                <p className="text-[10px] mt-[4px]">
                  ウルトラハイパー超すごいしまぶ...
                </p>
              </Link>
            </li>
          </ul>
        </section>
      </div>
      <SideBar />
    </main>
  );
}
