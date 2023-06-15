import ChefHero from "@/app/components/Chef/ChefHero";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Chef",
  description: "Generated by create next app",
};

export default function ChefLinks() {
  return (
    <>
      <ChefHero page="links" />

      {/* リンク */}
      <section className="pb-[48px]">
        <ul>
          <li className="py-[22px] px-[15px] border-b-[1px] border-border relative">
            <div className="flex items-center gap-x-[16px]">
              <div className="w-[56px] h-[56px]">
                <Image src="/images/twitter.png" alt="search icon" width={56} height={56} />
              </div>
              <div>
                <p className="text-title">Twitter</p>
                <div className="flex gap-x-[8px] mt-[8px] text-[14px]">
                  <p>1,234 フォロワー</p>
                  <p>@shimabu_it</p>
                </div>
              </div>
            </div>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              className="absolute right-[20px] top-1/2 -translate-y-1/2 inline-block w-[24px] h-[24px]"
            >
              <Image src="/images/externalLink.png" alt="search icon" width={24} height={24} />
            </Link>
          </li>
          <li className="py-[22px] px-[15px] border-b-[1px] border-border relative">
            <div className="flex items-center gap-x-[16px]">
              <div className="w-[56px] h-[56px]">
                <Image src="/images/twitter.png" alt="search icon" width={56} height={56} />
              </div>
              <div>
                <p className="text-title">Twitter</p>
                <div className="flex gap-x-[8px] mt-[8px] text-[14px]">
                  <p>1,234 フォロワー</p>
                  <p>@shimabu_it</p>
                </div>
              </div>
            </div>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              className="absolute right-[20px] top-1/2 -translate-y-1/2 inline-block w-[24px] h-[24px]"
            >
              <Image src="/images/externalLink.png" alt="search icon" width={24} height={24} />
            </Link>
          </li>
          <li className="py-[22px] px-[15px] border-b-[1px] border-border relative">
            <div className="flex items-center gap-x-[16px]">
              <div className="w-[56px] h-[56px]">
                <Image src="/images/twitter.png" alt="search icon" width={56} height={56} />
              </div>
              <div>
                <p className="text-title">Twitter</p>
                <div className="flex gap-x-[8px] mt-[8px] text-[14px]">
                  <p>1,234 フォロワー</p>
                  <p>@shimabu_it</p>
                </div>
              </div>
            </div>
            <Link
              href="https://www.twitter.com"
              target="_blank"
              className="absolute right-[20px] top-1/2 -translate-y-1/2 inline-block w-[24px] h-[24px]"
            >
              <Image src="/images/externalLink.png" alt="search icon" width={24} height={24} />
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}
