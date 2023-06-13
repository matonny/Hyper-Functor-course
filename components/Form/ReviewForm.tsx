import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ReviewFormData, reviewSchema } from "./FormTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CreateProductReviewDocument,
  useCreateProductReviewMutation,
} from "../../generated/graphql";
import { apolloClient } from "../../graphql/apolloClient";
import { FormInput } from "./FormInput";
import { reviewInitialData } from "./FormData";
import { RatingInput } from "../Rating/RatingInput";
interface ReviewFormProps {
  productSlug: string;
}
export const ReviewForm = ({ productSlug }: ReviewFormProps) => {
  const [createReview, createReviewResult] = useCreateProductReviewMutation({
    client: apolloClient,
  });
  const addReview = (data: ReviewFormData) => {
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: data.headline,
          name: data.name,
          email: data.email,
          content: data.content ? data.content : "",
          rating: data.rating,
          product: { connect: { slug: productSlug } },
        },
      },
    });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ReviewFormData>({
    mode: "onSubmit",
    reValidateMode: "onBlur",
    resolver: yupResolver(reviewSchema),
  });
  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    console.log(data.rating);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput {...reviewInitialData.name} register={register} />
      <FormInput {...reviewInitialData.headline} register={register} />
      <FormInput {...reviewInitialData.email} register={register} />
      <Controller
        name="rating"
        control={control}
        render={({ field }) => (
          <RatingInput value={field.value} onChange={field.onChange} />
        )}
      />
      <FormInput {...reviewInitialData.content} register={register} textarea />
      <button type="submit">Dodaj komentarz</button>
    </form>
  );
};
