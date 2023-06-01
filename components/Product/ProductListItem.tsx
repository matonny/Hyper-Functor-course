import Image from "next/image";
import { useCartState } from "../Cart/CartContext";
import { ProductListItemProps } from "./ProductTypes";
import Link from "next/link";
import { AddProductToCartButton } from "./AddProductToCartButton";

export const ProductListItem = ({ data }: ProductListItemProps) => {
  return (
    <div>
      <div className="bg-white p-4">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <div className="p-4">
        <Link href={`/products/${data.id}`}>
          <a>
            <h2 className="p-4 text-3xl ">{data.title}</h2>
          </a>
        </Link>
      </div>
      <AddProductToCartButton
        price={data.price}
        title={data.title}
        count={1}
        id={data.id}
      />
    </div>
  );
};
