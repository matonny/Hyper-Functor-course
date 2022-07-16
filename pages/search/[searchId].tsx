import { count } from "console";
import { InferGetStaticPropsType } from "next";
import { totalmem } from "os";
import Pagination from "../../components/Pagination";
import { ProductListItem } from "../../components/Product";

const productSearchPage = ({
  indexedData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!indexedData) {
    return <div>Nie znaleziono produktu</div>;
  }
  const { id, products, totalPages } = indexedData;
  if (!products) {
    return <div>Nie znaleziono produktu</div>;
  }
  return (
    <>
      <div>
        <Pagination maxPages={totalPages} currentPage={id} prerendered={true} />
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
  const itemsInApi = await countItemsInApi();
  const pages = Array(Math.ceil(itemsInApi / 25))
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
  const data = await getDataFromApi(25 * (+params.searchId - 1), 25);
  const pagesCount = Math.floor((await countItemsInApi()) / 25);
  const indexedData: searchPage = {
    id: +params.searchId,
    products: data,
    totalPages: pagesCount,
  };
  return {
    props: {
      indexedData,
    },
  };
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
  products: StoreApiResponse[] | null;
  totalPages: number;
}

const countItemsInApi = async () => {
  let previousValue = 0;
  let maxValue = 0;
  const stepSize = 1000;
  let foundUpperLimit = false;
  while (!foundUpperLimit) {
    const data = await getDataFromApi(maxValue, 1);
    if (data === null || data.length === 0) {
      foundUpperLimit = true;
    } else {
      previousValue = maxValue;
      maxValue += stepSize;
    }
  }
  while (maxValue > previousValue) {
    const middlePoint = Math.floor(
      previousValue + (maxValue - previousValue) / 2
    );
    const res = await fetch(
      `https://naszsklep-api.vercel.app/api/products?take=1&offset=${middlePoint}`
    );
    const data = await res.json();
    if (data === null || data.length === 0) {
      maxValue = middlePoint - 1;
    } else {
      previousValue = middlePoint + 1;
    }
  }
  return previousValue;
};

const getDataFromApi = async (offset: number, count: number) => {
  const requestUrl = `https://naszsklep-api.vercel.app/api/products?offset=${offset.toString()}&take=${count}`;

  const res = await fetch(requestUrl);
  const data: StoreApiResponse[] | null = await res.json();

  return data;
};
