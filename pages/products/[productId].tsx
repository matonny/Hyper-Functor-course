import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ProductDetails } from "../../components/Product";
import { countItemsInApi, getDataFromApi } from "../../helpers/apiHelpers";

const productIdPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          longDescription: data.longDescription,
        }}
      />
    </div>
  );
};
export default productIdPage;

export const getStaticPaths = async () => {
  const itemsInApi = 10;
  const pages = Array(itemsInApi)
    .fill(0)
    .map((_, index) => index + 1);

  return {
    paths: pages.map((product) => {
      return {
        params: {
          productId: product.toString(),
        },
      };
    }),
    fallback: "blocking",
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
  const data = (await getDataFromApi(+params.productId - 1, 1))[0];

  return {
    props: {
      data,
    },
    revalidate: 100,
  };
};

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;
