import Image from "next/image";
import Link from "next/link";

export default function AllChefs({
  searchParams,
  chefs,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  chefs: {
    id: string;
    displayName: string;
    bio: string;
    profileImageUrl: string;
    recipeCount: number;
  }[];
}) {
  return (
    <section className="pt-[20px] px-[15px] pb-[48px]">
      <h2 className=" text-title font-bold text-[20px]">
        {searchParams.q ? `「${searchParams.q}」で検索` : "シェフ一覧"}
      </h2>
      <ul className="flex flex-col gap-y-[20px] mt-[10px]">
        {chefs.map((chef) => (
          <li key={chef.id}>
            <Link href="/chef/1/recipes" className="flex gap-x-[16px]">
              <Image
                className="w-[88px] flex-none h-[116px] rounded-[16px] overflow-hidden"
                src={chef.profileImageUrl}
                alt={chef.displayName}
                width={88}
                height={116}
              />
              <div>
                <p className="text-[18px] font-bold text-title">{chef.displayName}</p>
                <p className="text-[14px] mt-[5px] line-clamp-3">{chef.bio}</p>
                <p className="text-[14px] mt-[5px] pl-[22px] relative leading-[16px]">
                  <span className="absolute left-0 top-0">
                    <Image
                      src="/images/top/chefs/tabler-icon-tools-kitchen-2.png"
                      alt="table icon"
                      width={16}
                      height={16}
                    />
                  </span>
                  {chef.recipeCount} レシピ
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
