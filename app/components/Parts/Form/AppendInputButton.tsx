"use client";

import { Plus } from "tabler-icons-react";
import { getLabelAndDescription } from "./utils/helpers";
import type { TMultiInputFieldType } from "./utils/types";

type Props = {
  type: TMultiInputFieldType;
  // FIXME: any削除
  append: any;
};

export function AppendInputButton({ type, append }: Props) {
  const handleClick = () => {
    append({ value: "" });
  };

  return (
    <button type="button" className="flex items-center gap-1 mt-2 px-4" onClick={handleClick}>
      <Plus className="w-5 text-primary" />
      <p className="text-primary">{getLabelAndDescription(type).description}</p>
    </button>
  );
}
