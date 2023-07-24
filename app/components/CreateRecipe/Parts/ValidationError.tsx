import { FC } from "react";
import { AlertTriangle } from "tabler-icons-react";

type Props = {
  errorMessage: string;
  //   index?: number;
};

export const ValidationError: FC<Props> = ({ errorMessage }) => {
  return (
    <p className="relative mx-[16px] px-[25px] text-primary text-[14px] mt-[8px]">
      <span className="absolute top-1/2 -translate-y-1/2 left-0 ">
        <AlertTriangle size={20} strokeWidth={1.5} color={"#E54D2E"} />
      </span>
      {errorMessage}
      {/* {`link${index + 1}: ${link?.value?.message}`} */}
    </p>
  );
};
