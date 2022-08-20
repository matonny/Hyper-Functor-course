import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem {
  readonly id: number;
  readonly price: number;
  readonly title: string;
  readonly count: number;
}

interface CartState {
  readonly items: CartItem[];
  readonly addItemToCart: (item: CartItem) => void;
  readonly removeItemFromCart: (id: CartItem["id"]) => void;
}

const STORAGE_TITLE = "ZAISTE_SHOPPING_CART";

export const CartStateContext = createContext<CartState | null>(null);

export const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem("ZAISTE_SHOPPING_CART");
  if (!itemsFromLocalStorage) {
    return [];
  }
  try {
    const items = JSON.parse(itemsFromLocalStorage);
    return items as CartItem[];
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem("ZAISTE_SHOPPING_CART", JSON.stringify(cartItems));
};
export const CartStateContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);

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
            const existingItem = prevCartItems.find(
              (existingItem) => existingItem.id === item.id
            );
            if (!existingItem) {
              return [...prevCartItems, item];
            }
            return prevCartItems.map((existingItem) => {
              if (existingItem.id === item.id) {
                return {
                  ...existingItem,
                  count: existingItem.count + 1,
                };
              }
              return existingItem;
            });
          });
        },
        removeItemFromCart: (id) => {
          setCartItems((prevCartItems = []) => {
            const existingItem = prevCartItems.find((el) => el.id === id);

            if (existingItem && existingItem.count === 1) {
              return prevCartItems.filter(
                (existingItem) => existingItem.id !== id
              );
            }
            return prevCartItems.map((existingItem) => {
              if (existingItem.id === id) {
                return {
                  ...existingItem,
                  count: existingItem.count - 1,
                };
              }
              return existingItem;
            });
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
