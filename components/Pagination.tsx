import Link from "next/link";

interface PaginationProps {
  maxPages: number;
  currentPage: number;
}

export const Pagination = ({ maxPages, currentPage }: PaginationProps) => {
  const values = Array(maxPages)
    .fill(0)
    .map((_, index) => {
      return index + 1;
    })
    .filter((value) => {
      return (
        value === 1 || // always keep 1st element
        value === maxPages || // always keep last element
        (currentPage >= value - 2 && currentPage <= value + 2) // keep 2 adjacent elements
      );
    })
    .map((value) => {
      console.log(value);
      if (
        value != 1 &&
        value != maxPages &&
        (value === currentPage - 2 || value === currentPage + 2)
      ) {
        return value - maxPages;
      } else {
        return value;
      }
    });
  console.log(values);
  return (
    <nav className="flex border-t border-gray-200 px-4 items-center justify-between sm:px-0">
      <ol className="hidden md:-mt-px md:flex">
        {values.map((val) => {
          if (val <= 0) {
            return (
              <li className="w-8"key={val}>
                <span className="border-transparent text-gray-500  border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium">
                  ...
                </span>
              </li>
            );
          } else {
            return (
              <li className="w-8"key={val}>
                <Link href={"/products-csr?page=" + val}>
                  <a
                    className={
                      val != currentPage
                        ? "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                        : "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                    }
                  >
                    {val}{" "}
                  </a>
                </Link>
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default Pagination;
