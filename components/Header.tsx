import { ActiveLink } from "./ActiveLink";
import { CartBar } from "./Cart/CartBar";

export const Header = () => {
  const links = [
    ["/", "Glowna"],
    ["/about", "About"],
    ["/products", "Products"],
  ];
  return (
    <header className="max-w-full p-4 mx-auto w-full flex items-center justify-between bg-gray-700">
      <nav className="text-white px-4 py-2">
        {links.map((elem) => {
          return <ActiveLink href={elem[0]} label={elem[1]} key={elem[1]} />;
        })}
      </nav>
      <CartBar />
    </header>
  );
};
