import { object, string, InferType } from "yup";

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

export const addressSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  phone: string().required(),
});

export type addressFormData = InferType<typeof addressSchema>;
