import Head from "next/head";
import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Head>
        <title>Test sklepu</title>
        <meta name="description" content="Jakiś opis sklepu" />
      </Head>
      <Header />
      <div className="flex-grow max">{children}</div>
      <Footer />
    </div>
  );
};
