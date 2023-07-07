import type { UseFormRegister, FormState, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = {
  label: string;
  registerName: Path<T>;
  register: UseFormRegister<T>;
  formState: FormState<T>;
  multiline?: boolean;
};

export function TextField<T extends FieldValues>({ label, registerName, register, formState, multiline }: Props<T>) {
  const { errors } = formState;
  const commonStyle =
    "border-t-[1px] border-b-[1px] border-border py-[9px] px-4 w-full focus:outline-none resize-none text-black";

  return (
    <div>
      <label className="font-bold text-title mb-1 px-4">{label}</label>
      {multiline ? (
        <textarea rows={4} className={`${commonStyle} resize-none`} {...register(registerName)} />
      ) : (
        <input type="text" className={commonStyle} {...register(registerName)} />
      )}
      {errors && <p className="text-primary px-4 font-bold text-sm">{errors[registerName]?.message as string}</p>}
    </div>
  );
}
