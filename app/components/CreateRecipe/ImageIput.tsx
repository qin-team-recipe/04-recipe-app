"use client";
import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";
import { ValidationError } from "./Parts/ValidationError";
import { useState } from "react";

export default function ImageInput() {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const image = useWatch({
    name: "image",
  });

  const [previewImageData, setPreviewImageData] = useState<string>("");

  const uploadImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const file = files![0];

    const reader = new FileReader();
    reader.onload = () => {
      setValue("image", files);
      setPreviewImageData(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const deleteImageHandler = () => {
    setValue("image", null);
    setPreviewImageData("");
  };

  const { onBlur, name, ref } = register("image");

  return (
    <section className="pt-[8px] pb-[24px]  overflow-x-hidden">
      <div className="flex justify-between py-[12px] items-center px-[16px] ">
        <h2 className="font-bold text-title text-[16px]">画像（任意）</h2>
      </div>

      <div className="px-[16px]">
        <div className="inline-block relative">
          {image ? (
            <>
              <Image src={previewImageData} alt="レシピの写真" width={128} height={128} />
              <button
                type="button"
                className="bg-primary absolute rounded-full w-[20px] h-[20px] -top-[5px] -right-[5px]"
                onClick={deleteImageHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-white ml-[4px]"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6l-12 12"></path>
                  <path d="M6 6l12 12"></path>
                </svg>
              </button>
            </>
          ) : (
            <>
              <label
                htmlFor="file"
                className="text-[12px] bg-white rounded-[8px] w-[128px] h-[128px] flex flex-col gap-y-[5px] items-center justify-center cursor-pointer border-[1px] border-border"
              >
                <p>画像を設定</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10.0001 4.16666V15.8333M4.16675 9.99999H15.8334"
                    stroke="#6F6E77"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </label>
              <input
                type="file"
                id="file"
                hidden
                className="display-none"
                onChange={uploadImageHandler}
                accept="image/*"
                multiple={false}
                onBlur={onBlur} // assign onBlur event
                name={name} // assign name prop
                ref={ref} // assign ref prop
                // {...register("image")}
              />
            </>
          )}
        </div>
      </div>

      {errors["image"] && <ValidationError errorMessage={errors["image"]?.message as string} />}
    </section>
  );
}
