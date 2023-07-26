import { trpcClient } from "@/app/utils/trpc";
import FavoriteChefCard from "./FavoriteChefCard";

export default async function FavoriteChefs() {
  const followingChefs = await trpcClient.followingChefs.query();

  return (
    <section className="pt-[20px] overflow-hidden">
      <h2 className="text-title font-bold text-[20px] px-[16px]">シェフ</h2>

      {followingChefs?.length === 0 ? (
        <p className="text-title pl-[16px] mt-[12px]">まだシェフをフォローしていません！</p>
      ) : (
        <ul className="flex gap-x-[16px] mt-[12px] w-screen  overflow-x-scroll md:w-full pl-[16px]">
          {followingChefs.map((chef) => (
            <FavoriteChefCard key={chef.id} chef={chef} />
          ))}
        </ul>
      )}
    </section>
  );
}
