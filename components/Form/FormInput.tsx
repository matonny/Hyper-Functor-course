import { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface InputProps<TFormData extends FieldValues> {
  name: Path<TFormData>;
  label: string;
  register: UseFormRegister<TFormData>;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
}

export const FormInput = <TFormData extends FieldValues>({
  name,
  label,
  register,
  placeholder,
  error,
  textarea,
}: InputProps<TFormData>) => {
  return (
    <>
      <label htmlFor={name} className="block text-xs font-medium text-gray-700">
        {label}
      </label>

      {textarea ? (
        <textarea
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      ) : (
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          {...register(name)}
          className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
      )}
      <span
        role="alert"
        className="text-red-500 mt-1 ml-3 text-sm font-bold h-5 block"
      >
        {error}
      </span>
    </>
  );
};
