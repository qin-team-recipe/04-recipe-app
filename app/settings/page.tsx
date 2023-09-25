import Link from "next/link";
import { redirectIfNotLoggedIn } from "../utils/auth";
import { DeleteUserButton, LogoutButton } from "./ActionButton";
import { ArrowLeft, ArrowUpRight, ChevronRight } from "tabler-icons-react";

export const dynamic = "force-dynamic";

export default async function Settings() {
  await redirectIfNotLoggedIn("/");

  return (
    <>
      <div className="flex items-center gap-4 px-[15px] py-[12px] border-b-[1px] border-border text-center text-title font-bold text-[20px]">
        <Link href="/favorite">
          <ArrowLeft />
        </Link>
        <h1>設定</h1>
      </div>
      <div className="mt-5 flex flex-col gap-8">
        <div>
          <p className="font-bold px-4">利用規約や問い合わせ</p>
          <div className="mt-3 flex flex-col">
            {/* TODO: リンクを設定する */}
            <Link href="/terms" className="px-4 py-3 flex justify-between">
              利用規約
              <ChevronRight />
            </Link>
            <Link href="/" className="px-4 py-3 flex justify-between">
              プライバシーポリシー
              <ChevronRight />
            </Link>
            <a target="_blank" className="px-4 py-3 cursor-pointer flex justify-between">
              運営会社
              <ArrowUpRight />
            </a>
            <a target="_blank" className="px-4 py-3 cursor-pointer flex justify-between">
              お問い合わせ
              <ArrowUpRight />
            </a>
          </div>
        </div>
        <div>
          <p className="font-bold px-4">アカウントの操作</p>
          <LogoutButton />
        </div>
        <div>
          <p className="font-bold px-4">取り消しができない操作</p>
          <DeleteUserButton />
        </div>
      </div>
    </>
  );
}
