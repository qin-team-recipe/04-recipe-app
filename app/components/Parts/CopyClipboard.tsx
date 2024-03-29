"use client";
import { FC } from "react";
import { toast } from "react-toastify";

type Props = {
  text: string;
};

const CopyClipboard: FC<Props> = ({ text }) => {
  const onClickClipboardHandler = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      await toast.success("クリップボードにコピーしました！");
    } catch (error) {
      await toast.success("コピーに失敗しました。");
    }
  };

  return (
    <>
      <button
        onClick={() => onClickClipboardHandler(text)}
        className="mt-[8.5px] pl-[18px] float-right pr-[16px] text-[12px] text-[#0066DB] relative"
      >
        <span className="absolute left-0 top-1/2 -translate-y-1/2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_3478_1001)">
              <path
                d="M5.33331 6.66659C5.33331 6.31296 5.47379 5.97383 5.72384 5.72378C5.97389 5.47373 6.31302 5.33325 6.66665 5.33325H12C12.3536 5.33325 12.6927 5.47373 12.9428 5.72378C13.1928 5.97383 13.3333 6.31296 13.3333 6.66659V11.9999C13.3333 12.3535 13.1928 12.6927 12.9428 12.9427C12.6927 13.1928 12.3536 13.3333 12 13.3333H6.66665C6.31302 13.3333 5.97389 13.1928 5.72384 12.9427C5.47379 12.6927 5.33331 12.3535 5.33331 11.9999V6.66659Z"
                stroke="#006ADC"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.6667 5.33341V4.00008C10.6667 3.64646 10.5262 3.30732 10.2762 3.05727C10.0261 2.80722 9.68698 2.66675 9.33335 2.66675H4.00002C3.6464 2.66675 3.30726 2.80722 3.05721 3.05727C2.80716 3.30732 2.66669 3.64646 2.66669 4.00008V9.33341C2.66669 9.68704 2.80716 10.0262 3.05721 10.2762C3.30726 10.5263 3.6464 10.6667 4.00002 10.6667H5.33335"
                stroke="#006ADC"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3478_1001">
                <rect width="16" height="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </span>
        コピーする
      </button>
      {/* <Toast /> */}
    </>
  );
};

export default CopyClipboard;
