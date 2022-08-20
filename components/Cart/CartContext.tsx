import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { CartState, CartItem } from "./CartTypes";

import {
  addItemToGivenCart,
  getCartItemsFromStorage,
  removeItemFromGivenCart,
  setCartItemsInStorage,
} from "./CartStorage";

export const CartStateContext = createContext<CartState | null>(null);

export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);
  const increaseValue = 1;
  const decreaseValue = -1;
  useEffect(() => {
    setCartItems(getCartItemsFromStorage());
  }, []); //empty array will result in useEffect being called only on initial render

  useEffect(() => {
    if (cartItems === undefined) {
      return;
    }
    setCartItemsInStorage(cartItems);
  }, [cartItems]);

  return (
    <CartStateContext.Provider
      value={{
        items: cartItems || [],
        addItemToCart: (item) => {
          setCartItems((prevCartItems = []) => {
            return addItemToGivenCart(prevCartItems, item);
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevCartItems = []) => {
            return removeItemFromGivenCart(prevCartItems, id);
          });
        },
      }}
    >
      {children}
    </CartStateContext.Provider>
  );
};

export const useCartState = () => {
  const cartState = useContext(CartStateContext);
  if (!cartState) {
    throw new Error("You forgot CartStateContextProvider!");
  }
  return cartState;
};
