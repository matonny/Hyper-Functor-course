import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<TFormData extends FieldValues> {
  name: Path<TFormData>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<TFormData>;
}

export const FormInput = <TFormData extends FieldValues>({
  name,
  label,
  register,
}: InputProps<TFormData>) => {
  return (
    <>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>

      <input
        type="text"
        id={name}
        {...register(name)}
        className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
    </>
  );
};
