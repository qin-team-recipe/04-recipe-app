import Image from "next/image";
import Link from "next/link";

type Chef = {
  id: string;
  displayName: string;
  profileImageUrl: string;
};

export default function FavoriteChefCard({ chef }: { chef: Chef }) {
  return (
    <li className="w-[68px] relative overflow-hidden flex-none">
      <Link href={`/chef/${chef.id}/recipes`}>
        <div className="relative w-[68px] h-[68px] object-cover rounded-[34px] overflow-hidden">
          <Image src={chef.profileImageUrl} alt="シェフの写真" fill />
        </div>

        <p className="text-[12px] mt-[4px] text-center line-clamp-1">{chef.displayName}</p>
      </Link>
    </li>
  );
}
