import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";

const productIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  if (!data) {
    return <div>Nie znaleziono produktu</div>;
  }
  return (
    <div>
      <Link href="/products">
        <a>Wróc na strone glowna</a>
      </Link>
      <ProductDetails
        data={{
          id: data.id,
          title: data.title,
          thumbnailUrl: data.image,
          thumbnailAlt: data.title,
          description: data.description,
          rating: data.rating.rate,
        }}
      />
    </div>
  );
};
export default productIdPage;

export const getStaticPaths = async () => {
  const res  = await fetch("https://fakestoreapi.com/products/")
  const data: StoreApiResponse[] = await res.json();

  return {
    paths: data.map((product)=>{
      return{
        params: {
          producId: product.id.toString()
        }
      }
    }),
    fallback: false,
  };
};
export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.productId) {
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
