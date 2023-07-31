"use client";
import { FC } from "react";
import { Dialog } from "./Parts/Dialog";

type Props = {
  userId?: string;
};

export const CreateRecipeHeader: FC<Props> = ({ userId }) => {
  const triggerButtonDraft = <button type="button">下書き一覧</button>;

  const triggetButtonGoBack = (
    <button type="button">
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
  );

  return (
    <div className="px-[15px] border-b-[1px] border-border text-center font-bold text-[16px] py-[12px] flex justify-between">
      {/* Xアイコン */}
      <Dialog direction={"goBack"} triggerButton={triggetButtonGoBack} userId={userId} />

      {/* 下書き一覧 */}
      <Dialog direction={"drafts"} triggerButton={triggerButtonDraft} />
    </div>
  );
};
