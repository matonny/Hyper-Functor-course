import { useCartState } from "../Cart/CartContext";
import { CartItem } from "../Cart/CartTypes";

export const AddProductToCartButton = (product: CartItem) => {
  const cartState = useCartState();
  return (
    <button
      onClick={() => cartState.addItemToCart(product)}
      className="p-3 bg-gray-200 w-full"
    >
      Dodaj do koszyka
    </button>
  );
};
