import { count } from "console";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import { totalmem } from "os";
import Pagination from "../../components/Pagination";
import { ProductListItem } from "../../components/Product";
import { countItemsInApi, getDataFromApi } from "../../helpers/apiHelpers";

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
  if (totalPages < id) {
    return (
      <div>
        <h2>Nie znaleziono strony</h2>
        <Link href="/search/1">Wróc do pierwszej strony wyszukiwania</Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center">
      <Pagination maxPages={totalPages} currentPage={id} prerendered={true} />
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-3.5">
        {products.map((product) => {
          return (
            <li
              key={product.id}
              className=" border-r-12 shadow-xl border-8 border-purple-200 bg-gray-50"
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
  );
};
export default productSearchPage;

export type InferGetStaticPaths<T> = T extends () => Promise<{
  paths: Array<{ params: infer R }>;
}>
  ? { params?: R }
  : never;

export const getStaticPaths = async () => {
  const pages = Array(10)
    .fill(0)
    .map((_, index) => index + 1)
    .slice(0, 10);
  return {
    paths: pages.map((page) => {
      return {
        params: {
          searchId: page.toString(),
        },
      };
    }),
    fallback: "blocking",
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
  const pagesCount = Math.ceil((await countItemsInApi()) / 25);
  const indexedData: searchPage = {
    id: +params.searchId,
    products: data,
    totalPages: pagesCount,
  };
  return {
    props: {
      indexedData,
    },
    revalidate: 100,
  };
};

const findLastIndex = async (start: number, end: number): Promise<number> => {
  const middle = Math.ceil(start + (end - start) / 2);
  const data = await getDataFromApi(middle, 1);
  if (start > end) {
    return start;
  }
  if (data.length === 0) {
    return findLastIndex(start, middle - 1);
  } else {
    return findLastIndex(middle + 1, end);
  }
};
