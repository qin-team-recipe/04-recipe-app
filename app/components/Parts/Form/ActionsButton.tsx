import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FC } from "react";
import { useWatch, useFormContext } from "react-hook-form";
import styles from "../../../styles/dropdownMenuContent.module.css";

type Props = {
  index: number;
  removeHandler: () => void;
  fieldName: string;
};

export const ActionsButton: FC<Props> = ({ index, removeHandler, fieldName }) => {
  const { setValue } = useFormContext();

  const fieldArray = useWatch({
    name: fieldName,
  });

  const shiftField = (currentIndex: number, newIndex: number) => {
    // フィールドの配列をコピー
    const updatedFields = [...fieldArray];
    // currentIndex番目のフィールドを1つだけ削除し、削除したフィールド（の0番目）を取得
    const movedField = updatedFields.splice(currentIndex, 1)[0];
    // newIndex番目のフィールドを削除せずに、そこにmovedFieldを挿入
    updatedFields.splice(newIndex, 0, movedField);
    setValue(fieldName, updatedFields);
  };

  const ifLastIndex = (index: number) => {
    if (index === fieldArray?.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    (fieldArray.length >= 1 || fieldName == "links") && (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.96888 3.13545C9.24237 2.86196 9.61331 2.70831 10.0001 2.70831C10.3869 2.70831 10.7578 2.86196 11.0313 3.13545C11.3048 3.40894 11.4584 3.77987 11.4584 4.16665C11.4584 4.55342 11.3048 4.92435 11.0313 5.19784C10.7578 5.47133 10.3869 5.62498 10.0001 5.62498C9.61331 5.62498 9.24237 5.47133 8.96888 5.19784C8.69539 4.92435 8.54175 4.55342 8.54175 4.16665C8.54175 3.77987 8.69539 3.40894 8.96888 3.13545ZM10.0001 3.95831C9.94483 3.95831 9.89184 3.98026 9.85277 4.01933C9.8137 4.0584 9.79175 4.11139 9.79175 4.16665C9.79175 4.2219 9.8137 4.27489 9.85277 4.31396C9.89184 4.35303 9.94483 4.37498 10.0001 4.37498C10.0553 4.37498 10.1083 4.35303 10.1474 4.31396C10.1865 4.27489 10.2084 4.2219 10.2084 4.16665C10.2084 4.11139 10.1865 4.0584 10.1474 4.01933C10.1083 3.98026 10.0553 3.95831 10.0001 3.95831ZM8.96888 8.96878C9.24237 8.69529 9.61331 8.54165 10.0001 8.54165C10.3869 8.54165 10.7578 8.69529 11.0313 8.96878C11.3048 9.24227 11.4584 9.61321 11.4584 9.99998C11.4584 10.3868 11.3048 10.7577 11.0313 11.0312C10.7578 11.3047 10.3869 11.4583 10.0001 11.4583C9.61331 11.4583 9.24237 11.3047 8.96888 11.0312C8.69539 10.7577 8.54175 10.3868 8.54175 9.99998C8.54175 9.61321 8.69539 9.24227 8.96888 8.96878ZM10.0001 9.79165C9.94483 9.79165 9.89184 9.8136 9.85277 9.85267C9.8137 9.89174 9.79175 9.94473 9.79175 9.99998C9.79175 10.0552 9.8137 10.1082 9.85277 10.1473C9.89184 10.1864 9.94483 10.2083 10.0001 10.2083C10.0553 10.2083 10.1083 10.1864 10.1474 10.1473C10.1865 10.1082 10.2084 10.0552 10.2084 9.99998C10.2084 9.94473 10.1865 9.89174 10.1474 9.85267C10.1083 9.8136 10.0553 9.79165 10.0001 9.79165ZM8.96888 14.8021C9.24238 14.5286 9.61331 14.375 10.0001 14.375C10.3869 14.375 10.7578 14.5286 11.0313 14.8021C11.3048 15.0756 11.4584 15.4465 11.4584 15.8333C11.4584 16.2201 11.3048 16.591 11.0313 16.8645C10.7578 17.138 10.3869 17.2916 10.0001 17.2916C9.61331 17.2916 9.24238 17.138 8.96888 16.8645C8.69539 16.591 8.54175 16.2201 8.54175 15.8333C8.54175 15.4465 8.69539 15.0756 8.96888 14.8021ZM10.0001 15.625C9.94483 15.625 9.89184 15.6469 9.85277 15.686C9.8137 15.7251 9.79175 15.7781 9.79175 15.8333C9.79175 15.8886 9.8137 15.9416 9.85277 15.9806C9.89184 16.0197 9.94483 16.0416 10.0001 16.0416C10.0553 16.0416 10.1083 16.0197 10.1474 15.9806C10.1865 15.9416 10.2084 15.8886 10.2084 15.8333C10.2084 15.7781 10.1865 15.7251 10.1474 15.686C10.1083 15.6469 10.0553 15.625 10.0001 15.625Z"
              fill="#6F6E77"
            />
          </svg>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content sideOffset={5} align="end" className={styles.DropdownMenuContent}>
            {index !== 0 && (
              <DropdownMenu.Item>
                <button
                  onClick={() => shiftField(index, index - 1)}
                  type="button"
                  className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                  >
                    <path
                      d="M4 10.5L8 6.5L12 10.5"
                      stroke="#6F6E77"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  上に移動する
                </button>
              </DropdownMenu.Item>
            )}
            {ifLastIndex(index) == false && (
              <DropdownMenu.Item>
                <button
                  onClick={() => shiftField(index, index + 1)}
                  type="button"
                  className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="17"
                    viewBox="0 0 16 17"
                    fill="none"
                    className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                  >
                    <path
                      d="M4 6.5L8 10.5L12 6.5"
                      stroke="#6F6E77"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  下に移動する
                </button>
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Item>
              <button
                type="button"
                className="py-[6px] pr-[12px] pl-[34px] block hover:bg-backgroundGray relative w-full text-left"
                onClick={removeHandler}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  className="absolute top-1/2 -translate-y-1/2 left-[12px]"
                >
                  <path
                    d="M2.66675 5.16667H13.3334M6.66675 7.83333V11.8333M9.33341 7.83333V11.8333M3.33341 5.16667L4.00008 13.1667C4.00008 13.5203 4.14056 13.8594 4.39061 14.1095C4.64065 14.3595 4.97979 14.5 5.33341 14.5H10.6667C11.0204 14.5 11.3595 14.3595 11.6096 14.1095C11.8596 13.8594 12.0001 13.5203 12.0001 13.1667L12.6667 5.16667M6.00008 5.16667V3.16667C6.00008 2.98986 6.07032 2.82029 6.19534 2.69526C6.32037 2.57024 6.48994 2.5 6.66675 2.5H9.33341C9.51023 2.5 9.6798 2.57024 9.80482 2.69526C9.92984 2.82029 10.0001 2.98986 10.0001 3.16667V5.16667"
                    stroke="#6F6E77"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                リストから削除する
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    )
  );
};
