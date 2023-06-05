import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";
import { ProductListItem } from "../components/Product/ProductListItem";

const getProducts = async (pageNumber: number) => {
  const pageSize = 25;
  const offset = pageSize * pageNumber;
  const address = `https://naszsklep-api.vercel.app/api/products?take=${pageSize}&offset=${offset}`;
  const res = await fetch(address);
  const data: StoreApiResponse[] = await res.json();
  return data;
};

const ProductsCSRPage = () => {
  const router = useRouter();
  const page = router.query.page ? +router.query.page : 1;

  // const { isLoading, data, error } = useQuery("products", () => page ? getProducts(page) : getProducts(0));
  const { isLoading, data, error } = useQuery(["products", page], () =>
    getProducts(page)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || error) {
    return <div>Coś poszło nie tak </div>;
  }

  return (
    <>
      <div>
        <Pagination maxPages={10} currentPage={page} prerendered={false} />
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {data.map((product) => {
            return (
              <li
                key={product.id}
                className=" border-r-12 shadow-xl border-8 border-purple-200 bg-gray-50 h-96"
              >
                <ProductListItem
                  data={{
                    price: product.price,
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

export default ProductsCSRPage;
export interface StoreApiResponse {
  id: string;
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
