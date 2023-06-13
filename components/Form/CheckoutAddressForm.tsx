import { useForm } from "react-hook-form";
import { AddressFormData, addressSchema } from "./FormTypes";
import { FormInput } from "./FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutInitialData as initialData } from "./FormData";

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
  return (
    <div className="bg-white py-12 md:py-24">
      <div className="mx-auto max-w-lg px-4 lg:px-8">
        <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
          <div className="col-span-6">
            <FormInput
              {...initialData.firstName}
              register={register}
              error={errors.firstName?.message}
            />
            <FormInput
              {...initialData.lastName}
              register={register}
              error={errors.lastName?.message}
            />
            <FormInput
              {...initialData.cardNumber}
              register={register}
              error={errors.cardNumber?.message}
            />
          </div>
          <div className="col-span-3">
            <FormInput
              {...initialData.cardCvc}
              register={register}
              error={errors.cardCvc?.message}
            />
          </div>
          <div className="col-span-3">
            <FormInput
              {...initialData.cardExpiry}
              register={register}
              error={errors.cardExpiry?.message}
            />
          </div>
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
