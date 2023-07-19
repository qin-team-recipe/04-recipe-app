import { trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";

export default async function TopChefs() {
  const chefs = await trpcCaller.chefs({});

  return (
    <section className="pt-[20px] pb-[48px] overflow-hidden">
      <div className="flex center justify-between px-[15px]">
        <h2 className="text-[20px] font-bold text-title">注目のシェフ</h2>
      </div>

      <ul className="flex gap-x-[16px] overflow-x-scroll w-screen md:w-full pl-[15px]">
        {chefs.slice(0, 4).map((chef) => (
          <li className="w-[148px] h-[220px] relative mt-[16px] rounded-[16px] flex-none overflow-hidden" key={chef.id}>
            <Link href={`/chef/${chef.id}/recipes`}>
              <Image src={chef.profileImageUrl} alt={chef.displayName} width={148} height={220} />
              <p className="absolute bottom-[11px] left-[11px] text-[20px] text-white font-bold ">{chef.displayName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
