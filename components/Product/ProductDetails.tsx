import Image from "next/image";
import { NextSeo } from "next-seo";
import { ZaisteReactMarkdown } from "../ZaisteReactMarkdown";
import { Rating } from "../Rating";
import { ProductProps } from "./ProductTypes";
import { AddProductToCartButton } from "./AddProductToCartButton";

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <div className="bg-white p-4 grid lg:grid-cols-2 grid-cols-1 gap-2">
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
      <div className="grid-cols-1">
        <Image
          src={data.thumbnailUrl}
          alt={data.thumbnailAlt}
          layout="responsive"
          width={16}
          height={9}
          objectFit="contain"
        />
      </div>
      <div className="grid-cols-1">
        <h2 className="p-4 text-3xl uppercase ">{data.title}</h2>
        <p className="p-4"> {data.description}</p>
        <article className="p-4 prose lg:prose-xl">
          <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
        </article>
        <Rating rating={data.rating} />
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
