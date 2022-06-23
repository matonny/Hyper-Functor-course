import { Rating } from "./Rating";

interface ProductDetails {
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number; 
}


interface ProductProps {
  data: ProductDetails;
}

export const ProductDetails = ({ data }: ProductProps) => {
  return (
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <h2 className="p-4 text-3xl ">{data.title}</h2>
      <p className="p-4"> {data.description}</p>
      <Rating rating={data.rating} />
    </>
  );
};

type ProductListItem = Pick<ProductDetails,
 'title' | 'thumbnailUrl' | 'thumbnailAlt'
 >;

interface ProdudctListItemProps {
  data: ProductListItem;
}
export const ProdudctListItem = ({ data }: ProdudctListItemProps) => {
  return (
    <>
      <img src={data.thumbnailUrl} alt={data.thumbnailAlt} />
      <h2 className="p-4 text-3xl ">{data.title}</h2>
    </>
  );
};