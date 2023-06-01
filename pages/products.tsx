import { InferGetStaticPropsType } from "next";
import { Layout } from "../components/Layout";
import { ProductListItem } from "../components/Product/ProductListItem";
import { apolloClient } from "../graphql/apolloClient";
import { gql } from "@apollo/client";
import {
  GetProductsListDocument,
  GetProductsListQuery,
} from "../generated/graphql";

const ProductsPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.products.map((product) => {
        console.log(product);
        return (
          <li key={product.slug} className="shadow-xl border-2">
            <ProductListItem
              data={{
                price: product.price,
                id: product.slug,
                title: product.name,
                thumbnailUrl: product.images[0].url,
                thumbnailAlt: product.name,
              }}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default ProductsPage;

export const getStaticProps = async () => {
  const { data } = await apolloClient.query<GetProductsListQuery>({
    query: GetProductsListDocument,
  });

  return {
    props: {
      data,
    },
  };
};
