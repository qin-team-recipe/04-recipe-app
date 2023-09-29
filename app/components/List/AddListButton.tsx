import { UseFieldArrayAppend, useFieldArray, useFormContext } from "react-hook-form";
import { ListSchema } from "./zodSchema";
import { Plus } from "tabler-icons-react";

type AppendTypes =
  | {
      title: "じぶんメモ";
      append: UseFieldArrayAppend<
        {
          list: {
            name: string;
            myMemoItemId: string;
            checked: boolean;
          }[];
        },
        "list"
      >;
    }
  | {
      title: "買い物リスト";
      append: UseFieldArrayAppend<
        {
          list: {
            name: string;
            shopListIngredientId: string;
            checked: boolean;
          }[];
        },
        "list"
      >;
    };

export default function AddListButton({ append, title }: AppendTypes) {
  const { setFocus, control } = useFormContext<ListSchema>();
  const { fields } = useFieldArray({
    control,
    name: "list",
  });

  const handleAddList = async () => {
    if (title !== "じぶんメモ") {
      await append({ name: "", checked: false, shopListIngredientId: "" });
    } else {
      await append({ name: "", checked: false, myMemoItemId: "" });
    }
    await setFocus(`list.${fields.length}.name`);
  };

  return (
    <button type="button" onClick={handleAddList}>
      <Plus size={20} strokeWidth={2} color={"#6F6E77"} />
    </button>
  );
}
