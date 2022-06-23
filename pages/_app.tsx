import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <QueryClientProvider client={client}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default MyApp;
