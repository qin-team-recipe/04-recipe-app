"use client";
import { signIn } from "next-auth/react";
import { BrandApple, BrandGoogle } from "tabler-icons-react";

export function LoginScreen() {
  return (
    <div className="text-center">
      <p className="mt-2 font-bold text-black">ログインをお願いします</p>
      <p className="mt-2 text-sm text-black">こちらの機能を利用するにはログインが必要です</p>
      <div className="mt-6 flex justify-center gap-2.5">
        <button
          className="bg-blue-10 flex items-center gap-1 px-3 py-2 bg-[#0081F1] rounded-[4px] text-white text-sm font-bold"
          onClick={() => signIn("google")}
        >
          <BrandGoogle size="16" strokeWidth="3" />
          Googleログイン
        </button>
        <button className="bg-blue-10 flex items-center gap-1 px-3 py-2 bg-black rounded-[4px] text-white text-sm font-bold">
          <BrandApple size="16" strokeWidth="3" />
          Appleログイン
        </button>
      </div>
    </div>
  );
}
