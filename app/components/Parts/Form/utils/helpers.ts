import type { TMultiInputFieldType } from "./types";

export const getLabelAndDescription = (multiInputFieldType: TMultiInputFieldType) => {
  switch (multiInputFieldType) {
    case "link":
      return { label: "リンク(任意)", description: "リンクを追加する" };
    case "process":
      return { label: "作り方", description: "工程を追加する" };
    case "ingredient":
      return { label: "材料/", description: "材料を追加する" };
  }
};
