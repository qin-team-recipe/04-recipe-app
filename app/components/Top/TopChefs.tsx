import Image from "next/image";
import Link from "next/link";

export default function TopChefs() {
  return (
    <section className="pt-[20px] px-[15px] pb-[48px] overflow-hidden overflow-x-scroll">
      <div className="flex center justify-between">
        <h2 className="text-[20px] font-bold text-title">注目のシェフ</h2>
      </div>

      <ul className="flex gap-x-[16px] w-screen overflow-x-auto">
        <li className="w-[148px] h-[220px] relative mt-[16px] overflow-hidden rounded-[16px] flex-none">
          <Link href="/chefs/1/recipes">
            <Image
              src="/images/top/chefs/chef1.png"
              alt="シェフの写真"
              width={148}
              height={220}
            />
            <p className="absolute bottom-[11px] left-[11px] text-[20px] text-white font-bold ">
              シェフの名前
            </p>
          </Link>
        </li>
        <li className="w-[148px] h-[220px] relative mt-[16px] overflow-hidden rounded-[16px] flex-none">
          <Link href="/chefs/1/recipes">
            <Image
              src="/images/top/chefs/chef1.png"
              alt="シェフの写真"
              width={148}
              height={220}
            />
            <p className="absolute bottom-[11px] left-[11px] text-[20px] text-white font-bold ">
              シェフの名前
            </p>
          </Link>
        </li>
        <li className="w-[148px] h-[220px] relative mt-[16px] overflow-hidden rounded-[16px] flex-none">
          <Link href="/chefs/1/recipes">
            <Image
              src="/images/top/chefs/chef1.png"
              alt="シェフの写真"
              width={148}
              height={220}
            />
            <p className="absolute bottom-[11px] left-[11px] text-[20px] text-white font-bold ">
              シェフの名前
            </p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
