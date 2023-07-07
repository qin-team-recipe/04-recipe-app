import { PlusIcon } from "../components/Icons";

export const ProfileImage = () => {
  return (
    <div className="px-4">
      <h2 className="font-bold text-title mb-1">プロフィール画像&ensp;(任意)</h2>
      <label htmlFor="file">
        <input type="file" id="file" className="hidden" />
        <div className="flex flex-col items-center justify-center gap-2 bg-[#fff] rounded-xl w-[100px] h-[100px] border border-border hover:cursor-pointer">
          <p className="text-xs">画像を設定</p>
          <PlusIcon />
        </div>
      </label>
    </div>
  );
};
