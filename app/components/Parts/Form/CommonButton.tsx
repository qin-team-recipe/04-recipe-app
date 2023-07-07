import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  primary?: boolean;
};

export function CommonButton({ children, primary }: Props) {
  return (
    <button
      type="submit"
      className={`${
        primary
          ? "bg-primary text-white hover:bg-lightenPrimary"
          : "bg-white text-primary border border-primary hover:bg-backgroundGray"
      } py-2  w-full rounded-md`}
    >
      {children}
    </button>
  );
}
