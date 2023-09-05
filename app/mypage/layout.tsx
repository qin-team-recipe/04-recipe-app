import { getServerSession } from "next-auth";
import Image from "next/image";
import { LoginScreen } from "../components/Auth/LoginScreen";

export default async function ChefLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  return (
    <>
      {session == null ? (
        <div>
          <div className="flex justify-between px-[15px] border-b-[1px] border-border text-center text-title font-bold text-[20px] py-[12px] items-center">
            <h1 className="flex-grow text-center">マイページ</h1>
          </div>
          <Image
            src="/images/girlBakingCookie.png"
            width="200"
            height="200"
            alt="クッキーを焼く女の子"
            className="mx-auto"
            priority={true}
          />
          <LoginScreen />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
}
