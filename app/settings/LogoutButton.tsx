"use client";
import { signOut } from "next-auth/react";
import { Logout } from "tabler-icons-react";

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut()} className="px-4 py-3 flex justify-between w-full">
      ログアウト
      <Logout />
    </button>
  );
};
