import SelectNetworkDialog from "@components/selectNetworkDialog";
import { useNetworks } from "@hooks/useNetwork";
import * as MicroStacks from "@micro-stacks/react";
import "@styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
// import "../lib/index.module.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);

  const queryClient = new QueryClient();
  const [interval, setInterval] = useState(0);

  const { currentStacksNetwork } = useNetworks();

  return (
    <SessionProvider session={pageProps.session} refetchInterval={830}>
      <QueryClientProvider client={queryClient}>
        <MicroStacks.ClientProvider
          enableNetworkSwitching
          appName="Tariala"
          appIconUrl="https://avatars.githubusercontent.com/u/87638650?s=200&v=4"
          network={currentStacksNetwork}
        >
          <Provider>
            <Toaster richColors position={"top-center"} />
            <NextNProgress
              color="#1ab98b"
              height={6}
              options={{ showSpinner: false }}
            />

            <Component {...pageProps} />

            <SelectNetworkDialog></SelectNetworkDialog>
          </Provider>
        </MicroStacks.ClientProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
export default MyApp;
