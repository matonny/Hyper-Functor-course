import {
  AddressFormData,
  InputCreationData,
  ReviewFormData,
} from "./FormTypes";

export const reviewInitialData: Record<
  keyof ReviewFormData,
  InputCreationData<ReviewFormData>
> = {
  name: { name: "name", label: "Name", placeholder: "John doe" },
  headline: {
    name: "headline",
    label: "Headline",
    placeholder: "Great product",
  },
  rating: { name: "rating", label: "Rating", placeholder: "5" },
  content: {
    name: "content",
    label: "Content",
    placeholder:
      "This thing changed my life. I love it and can't imagine my life without it",
  },
  email: {
    name: "email",
    label: "Email address",
    placeholder: "john.doe@gmail.com",
  },
};

export const checkoutInitialData: Record<
  keyof AddressFormData,
  InputCreationData<AddressFormData>
> = {
  firstName: { name: "firstName", label: "First name", placeholder: "John" },
  lastName: { name: "lastName", label: "Last name", placeholder: "Doe" },
  email: {
    name: "email",
    label: "Email address",
    placeholder: "john.doe@gmail.com",
  },
  phone: { name: "phone", label: "Phone number", placeholder: "123456789" },
  cardNumber: {
    name: "cardNumber",
    label: "Card number",
    placeholder: "1111222233334444",
  },
  cardCvc: { name: "cardCvc", label: "CVC", placeholder: "123" },
  cardExpiry: {
    name: "cardExpiry",
    label: "Expiry date",
    placeholder: "12/24",
  },
  postalCode: {
    name: "postalCode",
    label: "Postal Code",
    placeholder: "00-000",
  },
};
