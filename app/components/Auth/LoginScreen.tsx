"use client";
import { signIn } from "next-auth/react";

export function LoginScreen() {
  return (
    <div className="text-center">
      <p className="mt-2 font-bold text-black">ログインをお願いします</p>
      <p className="mt-2 text-sm text-black">こちらの機能を利用するにはログインが必要です</p>
      <div className="mt-6 flex justify-center gap-2.5">
        <button className="bg-blue-10" onClick={() => signIn("google")}>
          Google ログイン
        </button>
        <button>Apple ログイン</button>
      </div>
    </div>
  );
}
