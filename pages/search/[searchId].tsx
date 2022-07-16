import { InferGetStaticPropsType } from "next";
import Pagination from "../../components/Pagination";
import { ProductListItem } from "../../components/Product";

const productSearchPage = ({
  indexedData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!indexedData) {
    return <div>Nie znaleziono produktu</div>;
  }
  const { id, products } = indexedData;
  if (!products) {
    return <div>Nie znaleziono produktu</div>;
  }
  return (
    <>
      <div>
        <Pagination maxPages={10} currentPage={id} prerendered={true} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {products.map((product) => {
            return (
              <li
                key={product.id}
                className=" border-r-12 shadow-xl border-8 border-purple-200 bg-gray-50 h-96"
              >
                <ProductListItem
                  data={{
                    id: product.id,
                    title: product.title,
                    thumbnailUrl: product.image,
                    thumbnailAlt: product.title,
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default productSearchPage;

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticPaths = async () => {
  const itemsInApi = await countItemsInAPI();
  const res = await fetch(
    "https://naszsklep-api.vercel.app/api/products?take=250&offset=0"
  );
  const data: StoreApiResponse[] = await res.json();
  console.log(data.length);
  const pages = Array(Math.ceil(data.length / 25))
    .fill(0)
    .map((_, index) => index + 1);
  return {
    paths: pages.map((page) => {
      return {
        params: {
          searchId: page.toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: InferGetStaticPaths<typeof getStaticPaths>) => {
  if (!params?.searchId) {
    return {
      props: {},
      notFound: true,
    };
  }
  const res = await fetch(
    `https://naszsklep-api.vercel.app/api/products?take=250&offset=${
      25 * (+params.searchId - 1)
    }`
  );

  const data: StoreApiResponse[] | null = await res.json();

  const indexedData: searchPage = {
    id: +params.searchId,
    products: data?.slice((+params.searchId - 1) * 25, +params.searchId * 25),
  };
  return {
    props: {
      indexedData,
    },
  };
};

const countItemsInAPI = async () => {
  let foundEnd = false;
  let currentLast = 0;
  while (!foundEnd) {
    const res = await fetch(
      `https://naszsklep-api.vercel.app/api/products?take=1&offset=${currentLast}`
    );
  }
  return 2;
};
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

export interface searchPage {
  id: number;
  products: StoreApiResponse[] | undefined;
}
