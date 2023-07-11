import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Plus, Minus } from "tabler-icons-react";
import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import type { FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  profile?: boolean;
  fieldName: Path<T>;
};

export function ImageInputField<T extends FieldValues>({ profile, fieldName }: Props<T>) {
  const [imageData, setImageData] = useState("");

  const fileInput = useRef<HTMLInputElement | null>(null);
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const showPreviewImage = (files: FileList) => {
    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImageData(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length <= 0) return;
    showPreviewImage(files); // プレビューの表示
  };

  const { ref, ...rest } = register(fieldName, {
    onChange,
  });

  return (
    <div className="px-4">
      <h2 className="font-bold text-title mb-3">{profile && "プロフィール"}画像(任意)</h2>

      {imageData ? (
        <div className="relative">
          <button className="absolute" onClick={() => setImageData("")}>
            <Minus
              className="w-5 h-5 bg-primary text-white rounded-full p-0.5 absolute -top-2 left-[86px] z-50 hover:bg-lightenPrimary"
              onClick={() => setImageData("")}
            />
          </button>
          <Image
            width={100}
            height={100}
            className="rounded-xl w-[100px] h-[100px] border border-border object-cover"
            src={imageData}
            alt="image"
          />
        </div>
      ) : (
        <label htmlFor="file">
          <input
            type="file"
            id="file"
            className="hidden"
            accept="image/*"
            ref={(e) => {
              ref(e);
              fileInput.current = e;
            }}
            {...rest}
          />
          <div className="flex flex-col items-center justify-center gap-2 bg-[#fff] rounded-xl w-[100px] h-[100px] border border-border hover:cursor-pointer">
            <p className="text-xs">画像を設定</p>
            <Plus className="w-5" />
          </div>
        </label>
      )}
    </div>
  );
}
