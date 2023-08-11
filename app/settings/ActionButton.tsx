"use client";
import { signOut } from "next-auth/react";
import { Logout, AlertCircle } from "tabler-icons-react";
import { trpcClient } from "../utils/trpc-client";

export function LogoutButton() {
  return (
    <button onClick={() => signOut()} className="px-4 py-3 flex justify-between w-full">
      ログアウト
      <Logout />
    </button>
  );
}

export function DeleteUserButton() {
  const handleDelete = async () => {
    if (!window.confirm("本当に退会しますか？削除されたデータを復元することはできません。")) return;

    await trpcClient.deleteUser.mutate();
    signOut();
  };

  return (
    <button onClick={handleDelete} className="px-4 py-3 flex justify-between w-full">
      退会する
      <AlertCircle />
    </button>
  );
}
