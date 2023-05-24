import { object, string, number, InferType, setLocale } from "yup";

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  postalCode: string;
}
setLocale({
  mixed: {
    default: "Pole ${path} niepoprawne",
    required: "Pole ${path} wymagane",
    notType: "Pole ${path} niepoprawne",
  },
  string: {
    email: "Adres e-mail niepoprawny",
  },
});

export const addressSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  phone: number().required(),
}).required();

export type addressFormData = InferType<typeof addressSchema>;
