import { trpcCaller } from "@/server/trpc/router";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/noscrollbar.module.css";

export default async function TopChefs() {
  const chefs = await trpcCaller.featuredChefs();

  return (
    <section className="pt-[20px] pb-[48px] overflow-hidden">
      <div className="flex center justify-between px-[15px]">
        <h2 className="font-serif text-[20px] font-bold text-title">注目のシェフ</h2>
      </div>

      {chefs.length === 0 ? (
        <p className="text-title pl-[15px mt-[16px]]">注目のシェフがいません！</p>
      ) : (
        <ul
          className={`flex gap-x-[16px] overflow-x-scroll w-screen md:w-full pl-[15px] mt-[16px] ${styles.noscrollbar}`}
        >
          {chefs.map((chef) => (
            <li className="w-[148px] h-[220px] relative  rounded-[16px] flex-none overflow-hidden" key={chef.id}>
              <Link href={`/chef/${chef.id}/recipes`}>
                <Image src={chef.profileImageUrl} alt={chef.displayName} fill />
                <p className="absolute bottom-[11px] left-[11px] text-[20px] text-white font-bold ">
                  {chef.displayName}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
