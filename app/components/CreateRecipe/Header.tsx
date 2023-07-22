"use client";

import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { CreateRecipeSchema } from "./zodSchema";

export const CreateRecipeHeader = () => {
  const router = useRouter();

  const { getFieldState } = useFormContext<CreateRecipeSchema>();

  const headerButtonsHandler = (direction: string) => {
    if (
      getFieldState("servings").isDirty ||
      getFieldState("description").isDirty ||
      getFieldState("title").isDirty ||
      getFieldState("image").isDirty ||
      getFieldState("ingredients").isDirty ||
      getFieldState("steps").isDirty ||
      getFieldState("links").isDirty
    ) {
      const result = window.confirm(
        "このページで行った変更は保存されていません。もしページを離れると、行った変更は失われてしまいます。よろしいですか？"
      );
      if (result && direction === "goBack") {
        router.back();
      }
      if (result && direction === "drafts") {
        router.push("/my-recipe/drafts");
      }
    } else {
      if (direction === "goBack") {
        router.back();
      }
      if (direction === "drafts") {
        router.push("/my-recipe/drafts");
      }
    }
  };

  return (
    <div className="px-[15px] border-b-[1px] border-border text-center font-bold text-[16px] py-[12px] flex justify-between">
      <button type="button" onClick={() => headerButtonsHandler("goBack")}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_380_1890)">
            <path d="M18 6L6 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 6L18 18" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <defs>
            <clipPath id="clip0_380_1890">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>

      <div className="flex gap-x-[16px]">
        <button type="button" onClick={() => headerButtonsHandler("drafts")}>
          下書き一覧
        </button>
      </div>
    </div>
  );
};
