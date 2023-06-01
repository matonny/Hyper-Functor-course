import { MarkdownOutput } from "../../helpers";

export interface ProductDetails {
  id: string;
  price: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  longDescription: MarkdownOutput;
}

export interface ProductProps {
  data: ProductDetails;
}

export type ProductListItem = Pick<
  ProductDetails,
  "id" | "title" | "thumbnailUrl" | "thumbnailAlt" | "price"
>;

export interface ProductListItemProps {
  data: ProductListItem;
}
