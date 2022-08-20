import { ActiveLink } from "./ActiveLink";

export const Header = () => {
  const links = [
    ["/", "Glowna"],
    ["/about", "About"],
    ["/products", "Products"],
  ];
  return (
    <header className="max-w-md p-4 mx-auto w-full flex items-center justify-between bg-gray-700">
      <nav className="text-white px-4 py-2">
        {links.map((elem) => {
          return <ActiveLink href={elem[0]} label={elem[1]} key={elem[1]} />;
        })}
      </nav>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    </header>
  );
};
