import { ActiveLink } from "./ActiveLink";

export const Header = () => {
  const links = [
    ["/", "Glowna"],
    ["/about", "About"],
    ["/products", "Products"],
  ];
  return (
    <header className="max-w-full">
      <nav className="bg-gray-700 text-white px-4 py-2">
        {links.map((elem) => {
          return <ActiveLink href={elem[0]} label={elem[1]} key={elem[1]} />;
        })}
      </nav>
    </header>
  );
};
