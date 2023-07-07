import { ProfileForm } from "./ProfileForm";
import type { TFieldValue } from "./type";

// FIXME: 仮のリンクデータ
const links = [
  { value: "https://www.google.com" },
  { value: "https://www.yahoo.co.jp" },
  { value: "https://qin.salon" },
] satisfies TFieldValue[];

export default async function Favorite() {
  return (
    <>
      {/* ヘッダー */}
      <div className="px-[15px] border-b-[1px] border-border text-center text-title font-bold text-[20px] py-[12px]">
        <h1>編集</h1>
      </div>
      <ProfileForm links={links} />
    </>
  );
}
