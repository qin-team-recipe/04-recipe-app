import Image from "next/image";
import { getServerSession } from "next-auth";
import { LoginScreen } from "../components/Auth/LoginScreen";
import { RecipeList } from "../components/List/RecipeList";
import { MyMemoList } from "../components/List/MyMemoList";
import { trpcClient } from "@/app/utils/trpc";

export const metadata = {
  title: "List",
  description: "Generated by create next app",
};

export default async function Page() {
  const session = await getServerSession();
  const shoppingList = await trpcClient.shoppingList.shoppingList.query();

  const myMemoList = await trpcClient.shoppingList.myMemoItems.query();

  return (
    <>
      {/* ヘッダー */}
      <div className="px-[15px] border-b-[1px] border-border text-center text-title font-bold text-[20px] py-[12px] ">
        <h1>買い物リスト</h1>
      </div>

      {session === null ? (
        <div>
          <Image
            src="/images/girlCooking.png"
            width="200"
            height="200"
            alt="揚げ物をする女の子"
            className="mx-auto"
            priority={true}
          />
          <LoginScreen />
        </div>
      ) : (
        <div>
          <MyMemoList myMemoList={myMemoList} />
          <RecipeList shoppingList={shoppingList} />
        </div>
      )}
    </>
  );
}
