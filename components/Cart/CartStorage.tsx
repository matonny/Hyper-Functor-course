import { CartItem, updateType } from "./CartTypes";

export const storageTitle = "ZAISTE_SHOPPING_CART";

export const getCartItemsFromStorage = () => {
  const itemsFromLocalStorage = localStorage.getItem(storageTitle);
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

const updateItemCount = (
  items: CartItem[],
  id: CartItem["id"],
  update: updateType
) => {
  return items.map((existingItem) => {
    if (existingItem.id === id) {
      return {
        ...existingItem,
        count: existingItem.count + (update === "Add" ? 1 : -1),
      };
    }
    return existingItem;
  });
};

export const setCartItemsInStorage = (cartItems: CartItem[]) => {
  localStorage.setItem(storageTitle, JSON.stringify(cartItems));
};

export const addItemToGivenCart = (cartItems: CartItem[], item: CartItem) => {
  const existingItem = cartItems.find((el) => el.id === item.id);
  if (!existingItem) {
    return [...cartItems, item];
  }
  return updateItemCount(cartItems, item.id, "Add");
};

export const removeItemFromGivenCart = (cartItems: CartItem[], id: number) => {
  const existingItem = cartItems.find((el) => el.id === id);
  if (existingItem && existingItem.count === 1) {
    return cartItems.filter((existingItem) => existingItem.id !== id);
  }
  return updateItemCount(cartItems, id, "Remove");
};
