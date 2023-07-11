import { useFormContext } from "react-hook-form";
import type { FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  fieldName: Path<T>;
  multiline?: boolean;
};

export function TextField<T extends FieldValues>({ label, fieldName, multiline }: Props<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();
  const commonStyle =
    "border-t-[1px] border-b-[1px] border-border py-[9px] px-4 w-full focus:outline-none resize-none text-black";

  return (
    <div>
      <label className="font-bold text-title mb-1 px-4">{label}</label>
      {multiline ? (
        <textarea rows={4} className={`${commonStyle} resize-none`} {...register(fieldName)} />
      ) : (
        <input type="text" className={commonStyle} {...register(fieldName)} />
      )}
      {errors && <p className="text-primary px-4 font-bold text-sm">{errors[fieldName]?.message as string}</p>}
    </div>
  );
}
