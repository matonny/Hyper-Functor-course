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
          <fieldset className="col-span-6">
            <legend className="block text-sm font-medium text-gray-700">
              Card Details
            </legend>

            <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
              <div>
                <label htmlFor="CardNumber" className="sr-only">
                  {" "}
                  Card Number{" "}
                </label>

                <input
                  type="text"
                  id="CardNumber"
                  {...register("cardNumber")}
                  placeholder="Card Number"
                  className="relative mt-1 w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                />
              </div>

              <div className="flex">
                <div className="flex-1">
                  <label htmlFor="CardExpiry" className="sr-only">
                    {" "}
                    Card Expiry{" "}
                  </label>

                  <input
                    type="text"
                    id="CardExpiry"
                    {...register("cardExpiry")}
                    placeholder="Expiry Date"
                    className="relative w-full rounded-es-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>

                <div className="-ms-px flex-1">
                  <label htmlFor="CardCVC" className="sr-only">
                    {" "}
                    Card CVC{" "}
                  </label>

                  <input
                    type="text"
                    id="CardCVC"
                    {...register("cardCvc")}
                    placeholder="CVC"
                    className="relative w-full rounded-ee-md border-gray-200 focus:z-10 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </fieldset>

          <fieldset className="col-span-6">
            <legend className="block text-sm font-medium text-gray-700">
              Billing Address
            </legend>

            <div className="mt-1 -space-y-px rounded-md bg-white shadow-sm">
              <div>
                <label htmlFor="Country" className="sr-only">
                  Country
                </label>

                <select
                  id="Country"
                  className="relative w-full rounded-t-md border-gray-200 focus:z-10 sm:text-sm"
                >
                  <option>England</option>
                  <option>Wales</option>
                  <option>Scotland</option>
                  <option>France</option>
                  <option>Belgium</option>
                  <option>Japan</option>
                </select>
              </div>

              <div>
                <label className="sr-only" htmlFor="PostalCode">
                  {" "}
                  ZIP/Post Code{" "}
                </label>

                <input
                  type="text"
                  id="PostalCode"
                  {...register("postalCode")}
                  placeholder="ZIP/Post Code"
                  className="relative w-full rounded-b-md border-gray-200 focus:z-10 sm:text-sm"
                />
              </div>
            </div>
          </fieldset>

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
