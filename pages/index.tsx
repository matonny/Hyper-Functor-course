import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Main } from "../components/Main";
import { ProductDetails } from "../components/Product";
import { Layout } from "../components/Layout";
import { apolloClient } from "../graphql/apolloClient";
import {
  CreateProductReviewDocument,
  CreateProductReviewMutation,
  CreateProductReviewMutationVariables,
  GetProductsSlugsQueryVariables,
  useCreateProductReviewMutation,
} from "../generated/graphql";

const DATA = {
  id: 2,
  title: "Whatever",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tempus nec dui pulvinar pharetra. Aenean et lacus ut metus sagittis porttitor vel et felis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut porta suscipit est.",
  thumbnailUrl: "https://picsum.photos/id/1060/536/354",
  thumbnailAlt: "Barista nalewajacy kawe do Chemexa",
  rating: 4.5,
};

const Home = () => {
  const [createReview, createReviewResult] = useCreateProductReviewMutation({
    client: apolloClient,
  });
  const addReview = () => {
    createReview({
      mutation: CreateProductReviewDocument,
      variables: {
        review: {
          headline: "Test review",
          name: "Mateusz",
          email: "siema@mati.com",
          content: "Bardzo dobry produkt",
          rating: 5,
        },
      },
    });
  };
  return (
    <Main>
      <button onClick={addReview} type="button">
        Dodaj komentarz
      </button>
      <pre>{JSON.stringify(createReviewResult.data, null, 2)}</pre>
    </Main>
  );
};

export default Home;
