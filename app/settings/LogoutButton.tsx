"use client";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return <button onClick={() => signOut()}>ログアウト</button>;
};
