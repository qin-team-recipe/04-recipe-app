import { useFieldArray } from "react-hook-form";

type Props = {
  append: (value: { item: string; checked: boolean }) => void;
};

export default function AddMyMemoButton({ append }: Props) {
  const fieldArray = useFieldArray({
    name: "myMemoList",
  });

  const handleAddMyMemo = () => {
    append({ item: "", checked: false });
  };

  return (
    <button type="button" onClick={handleAddMyMemo}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.16666V15.8333" stroke="#6F6E77" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4.16675 10H15.8334" stroke="#6F6E77" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
