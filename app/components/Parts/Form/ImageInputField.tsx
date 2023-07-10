import { PlusIcon } from "@/app/components/Icons";

type Props = {
  profile?: boolean;
};

export function ImageInputField({ profile }: Props) {
  return (
    <div className="px-4">
      <h2 className="font-bold text-title mb-1">{profile && "プロフィール"}画像(任意)</h2>
      <label htmlFor="file">
        <input type="file" id="file" className="hidden" />
        <div className="flex flex-col items-center justify-center gap-2 bg-[#fff] rounded-xl w-[100px] h-[100px] border border-border hover:cursor-pointer">
          <p className="text-xs">画像を設定</p>
          <PlusIcon />
        </div>
      </label>
    </div>
  );
}
