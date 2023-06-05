import Image from "next/image";
import { NextSeo } from "next-seo";
import { ZaisteReactMarkdown } from "../ZaisteReactMarkdown";
import { Rating } from "../Rating/Rating";
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
      <div className="p-4 grid-cols-1">
        <h2 className="text-3xl my-6 uppercase ">{data.title}</h2>
        <p className="text-4xl my-6">{`${data.price / 100} $`}</p>
        <Rating
          rating={data.rating}
          unfilledColor="#777777"
          filledColor="#333333"
        />
        <p className=" text-xl text-gray-500 m6-4"> {data.description}</p>
        <article className="my-6 prose lg:prose-l">
          <ZaisteReactMarkdown>{data.longDescription}</ZaisteReactMarkdown>
        </article>
        <AddProductToCartButton
          price={data.price}
          title={data.title}
          count={1}
          id={data.id}
        />
      </div>
    </div>
  );
};
