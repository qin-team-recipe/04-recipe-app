import Image from "next/image";
import Link from "next/link";

export default function Chefs() {
  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <div className="flex center justify-between">
        <h2 className="text-[20px] font-bold text-title">シェフ</h2>
        <Link href="/search/chef" className="font-bold text-[16px]">
          もっと見る
        </Link>
      </div>
      <ul className="mt-[16px]">
        <li className="mt-[25px]">
          <Link href="/chef/1/recipes" className="flex gap-x-[16px]">
            <Image
              className="w-[88px] flex-none h-[116px] rounded-[16px] overflow-hidden"
              src="/images/top/chefs/chef1.png"
              alt="シェフの写真"
              width={88}
              height={116}
            />
            <div>
              <p className="text-[18px] font-bold text-title">シェフの名前</p>
              <p className="text-[14px] mt-[5px]">
                白ごはん.comを運営しています。アップしたレシピの紹介や、youtube動画、日々の食のこと、オリジナル商品など...
              </p>
              <p className="text-[14px] mt-[5px] pl-[22px] relative leading-[16px]">
                <span className="absolute left-0 top-0">
                  <Image
                    src="/images/top/chefs/tabler-icon-tools-kitchen-2.png"
                    alt="table icon"
                    width={16}
                    height={16}
                  />
                </span>
                123 レシピ
              </p>
            </div>
          </Link>
        </li>
        <li className="mt-[25px]">
          <Link href="/chef/1/recipes" className="flex gap-x-[16px]">
            <Image
              className="w-[88px] flex-none h-[116px] rounded-[16px] overflow-hidden"
              src="/images/top/chefs/chef1.png"
              alt="シェフの写真"
              width={88}
              height={116}
            />
            <div>
              <p className="text-[18px] font-bold text-title">シェフの名前</p>
              <p className="text-[14px] mt-[5px]">
                白ごはん.comを運営しています。アップしたレシピの紹介や、youtube動画、日々の食のこと、オリジナル商品など...
              </p>
              <p className="text-[14px] mt-[5px] pl-[22px] relative leading-[16px]">
                <span className="absolute left-0 top-0">
                  <Image
                    src="/images/top/chefs/tabler-icon-tools-kitchen-2.png"
                    alt="table icon"
                    width={16}
                    height={16}
                  />
                </span>
                123 レシピ
              </p>
            </div>
          </Link>
        </li>
        <li className="mt-[25px]">
          <Link href="/chef/1/recipes" className="flex gap-x-[16px]">
            <Image
              className="w-[88px] flex-none h-[116px] rounded-[16px] overflow-hidden"
              src="/images/top/chefs/chef1.png"
              alt="シェフの写真"
              width={88}
              height={116}
            />
            <div>
              <p className="text-[18px] font-bold text-title">シェフの名前</p>
              <p className="text-[14px] mt-[5px]">
                白ごはん.comを運営しています。アップしたレシピの紹介や、youtube動画、日々の食のこと、オリジナル商品など...
              </p>
              <p className="text-[14px] mt-[5px] pl-[22px] relative leading-[16px]">
                <span className="absolute left-0 top-0">
                  <Image
                    src="/images/top/chefs/tabler-icon-tools-kitchen-2.png"
                    alt="table icon"
                    width={16}
                    height={16}
                  />
                </span>
                123 レシピ
              </p>
            </div>
          </Link>
        </li>
      </ul>
    </section>
  );
}
