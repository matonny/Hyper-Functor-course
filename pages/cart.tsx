import { useCartState } from "../components/Cart/CartContext";
import { Layout } from "../components/Layout";
const CartContent = () => {
  const cartState = useCartState();
  return (
    <div className="col-span-2">
      <ul className="divide-y divide-gray-200">
        {cartState.items.map((item, index) => (
          <li className="p-4" key={`${item.title}_${index}`}>
            <div className="flex justify-between">
              <div className="max-w-lg w">
                {item.count} x {item.title}
              </div>
              <div className="flex items-center">
                {item.price}
                <button
                  onClick={() => cartState.removeItemFromCart(item.id)}
                  className="ml-4 text-red-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CartSummary = () => {
  const cartState = useCartState();
  return (
    <div>
      <h2>Podsumowanie koszyka</h2>
      <p>Liczba elementów: {cartState.items.length} </p>
    </div>
  );
};
const CartPage = () => {
  return (
    <div className="max-w-5xl mx-auto w-full p-4">
      <div className="grid grid-cols-3 gap-8">
        <CartContent />
        <CartSummary />
      </div>
    </div>
  );
};

export default CartPage;
