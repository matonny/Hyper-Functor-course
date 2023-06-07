import { useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "./FormTypes";
import { FormInput } from "./FormInput";
import { yupResolver } from "@hookform/resolvers/yup";

export const CheckoutAddressForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(addressSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));
  const inputsData: {
    name: keyof AddressFormData;
    label: string;
    placeholder: string;
  }[] = [
    { name: "firstName", label: "First name", placeholder: "John" },
    { name: "lastName", label: "Last name", placeholder: "Doe" },
    {
      name: "email",
      label: "Email address",
      placeholder: "john.doe@gmail.com",
    },
    { name: "phone", label: "Phone number", placeholder: "123456789" },
    {
      name: "cardNumber",
      label: "Card number",
      placeholder: "1111222233334444",
    },
    { name: "cardCvc", label: "CVC", placeholder: "123" },
    { name: "cardExpiry", label: "Expiry date", placeholder: "12/24" },
    { name: "postalCode", label: "Postal Code", placeholder: "00-000" },
  ];

  return (
    <div className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
          {inputsData.map((input) => {
            return (
              <div className="col-span-6" key={input.name}>
                <FormInput<AddressFormData>
                  name={input.name}
                  label={input.label}
                  error={errors[input.name]?.message}
                  placeholder={input.placeholder}
                  register={register}
                ></FormInput>
              </div>
            );
          })}

          <div className="col-span-6">
            <button className="block w-full rounded-md bg-black p-2.5 text-sm text-white transition hover:shadow-lg">
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
