import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}
export const Main = ({ children }: MainProps) => {
  return (
    <main className="bg-teal-50 container center flex-grow mx-auto grid p-6 gap-6 sm:grid-cols-2">
      {children}
    </main>
  );
};
