import { useForm } from "react-hook-form";
import { CheckoutFormData } from "./FormTypes";

export const CheckoutAddressForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>();

  const onSubmit = handleSubmit((data) => console.log(data));
  <div className="bg-white py-12 md:py-24">
    <div className="mx-auto max-w-lg px-4 lg:px-8">
      <form className="grid grid-cols-6 gap-4" onSubmit={onSubmit}>
        <div className="col-span-3">
          <label
            htmlFor="FirstName"
            className="block text-xs font-medium text-gray-700"
          >
            First Name
          </label>

          <input
            type="text"
            id="FirstName"
            {...register("firstName")}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>

        <div className="col-span-3">
          <label
            htmlFor="LastName"
            className="block text-xs font-medium text-gray-700"
          >
            Last Name
          </label>

          <input
            type="text"
            id="LastName"
            {...register("lastName")}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="Email"
            className="block text-xs font-medium text-gray-700"
          >
            Email
          </label>

          <input
            type="email"
            id="Email"
            {...register("email")}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>

        <div className="col-span-6">
          <label
            htmlFor="Phone"
            className="block text-xs font-medium text-gray-700"
          >
            Phone
          </label>

          <input
            type="tel"
            id="Phone"
            {...register("phone")}
            className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
          />
        </div>

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
  </div>;
};
