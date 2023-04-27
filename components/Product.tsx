import Link from "next/link";
import Image from "next/image";
import { Rating } from "./Rating";
import React from "react";
import { NextSeo } from "next-seo";
import { ZaisteReactMarkdown } from "./ZaisteReactMarkdown";
import { MarkdownOutput } from "../helpers";
import { useCartState } from "./Cart/CartContext";

interface ProductDetails {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownOutput;
}

interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <div className="bg-white p-4">
        <NextSeo
          title={data.title}
          description={data.description}
          canonical={`https://naszsklep.vercel.app/products/${data.id}`}
          openGraph={{
            url: `https://naszsklep.vercel.app/products/${data.id}`,
            title: data.title,
            description: data.description,
            images: [
              {
                url: data.thumbnailUrl,
                alt: data.thumbnailAlt,
                type: "image/jpeg",
              },
            ],
            site_name: "Nasz Sklep",
          }}
          twitter={{
            handle: "@handle",
            site: "@site",
            cardType: "summary_large_image",
          }}
        />
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
        <h2 className="p-4 text-3xl ">{data.title}</h2>
        <p className="p-4"> {data.description}</p>
        <article className="p-4 prose lg:prose-xl">
          <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
        </article>
        <Rating rating={data.rating} />
      </div>
    </>
  );
};

type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt"
>;

interface ProductListItemProps {
  data: ProductListItem;
}
export const ProductListItem = ({ data }: ProductListItemProps) => {
  const cartState = useCartState();
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
        <button
          onClick={() =>
            cartState.addItemToCart({
              price: 21.37,
              title: data.title,
              count: 1,
              id: data.id,
            })
          }
          className="p-3 bg-gray-200"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
};
