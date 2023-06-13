import { object, string, number, InferType, setLocale } from "yup";

export interface InputCreationData<TFormInputs> {
  name: keyof TFormInputs;
  label: string;
  placeholder: string;
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

export const reviewSchema = object({
  headline: string().required(),
  name: string().required(),
  email: string().email().required(),
  rating: number().required().lessThan(6).moreThan(0),
  content: string(),
});

export type ReviewFormData = InferType<typeof reviewSchema>;
