import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";

const productIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();

  if (!data) {
    return <div>Nie znaleziono produktu</div>;
  }
  return <div>
    <ProductDetails data={{
        title: data.title,
        thumbnailUrl: data.image,
        thumbnailAlt: data.title,
        description: data.description,
        rating: data.rating.rate,

    }}/>
  </div>;
};
export default productIdPage;

export const getStaticPaths = () => {
    return{
        paths: [
            {
                params: {
                    productId: "1",
                },
            },
        ],
        fallback: false,
    };
};
export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params.productId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(
    `https://fakestoreapi.com/products/${params.productId}`
  );
  const data: StoreApiResponse | null = await res.json();

  return {
    props: {
      data,
    },
  };
};

export type InferGetStaticPaths<T> = T extends () => Promise<{
    paths: Array<{ params: infer R }>;
  }>
    ? { params?: R }
    : never;

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
