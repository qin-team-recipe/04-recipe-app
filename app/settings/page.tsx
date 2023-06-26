import { trpcClient } from "../utils/trpc";
import { LogoutButton } from "./LogoutButton";

export default async function Settings() {
  const user = await trpcClient.currentUser.query();

  return (
    <>
      <div className="px-[15px] border-b-[1px] border-border text-center text-title font-bold text-[20px] py-[12px] ">
        <h1>設定</h1>
      </div>
      <div>
        <p>{user.name}</p>
        <LogoutButton />
      </div>
    </>
  );
}
