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
  phone: string().required(),
  cardNumber: string().required().length(16),
  cardExpiry: string()
    .matches(/[0-9]{2}\/[0-9]{2}/)
    .required(),
  cardCvc: string().required().length(3),
  postalCode: string()
    .required()
    .matches(/(([0-9]|[A-Z]){2,3})[ -]\1/),
}).required();

export type AddressFormData = InferType<typeof addressSchema>;
