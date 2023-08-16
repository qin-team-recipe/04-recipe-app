import { useFieldArray, useFormContext } from "react-hook-form";
import { ListSchema } from "./zodSchema";
import { Plus } from "tabler-icons-react";

type Props = {
  append: (value: { item: string; checked: boolean }) => void;
};

export default function AddListButton({ append }: Props) {
  const { setFocus, control } = useFormContext<ListSchema>();

  const { fields } = useFieldArray({
    control,
    name: "list",
  });

  const handleAddList = async () => {
    await append({ item: "", checked: false });
    await setFocus(`list.${fields.length}.item`);
  };

  return (
    <button type="button" onClick={handleAddList}>
      <Plus size={20} strokeWidth={2} color={"#6F6E77"} />
    </button>
  );
}
