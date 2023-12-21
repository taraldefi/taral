import SelectNetworkDialog from "@components/selectNetworkDialog";
import * as MicroStacks from "@micro-stacks/react";
import "@styles/globals.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useAtom } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";
import { Toaster } from "sonner";
import "taral-ui/build/index.scss";
import { StacksMocknet } from "micro-stacks/network";
import {
  currentNetworkAtom,
  currentStacksNetworkAtom,
} from "@store/networkStore";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.remove();
    }
  }, []);
  const queryClient = new QueryClient();

  const [currentNetwork] = useAtom(currentStacksNetworkAtom);
  console.log(currentNetwork);

  const devnet = new StacksMocknet({ coreApiUrl: "http://localhost:3999" });

  return (
    <MicroStacks.ClientProvider
      appName="Tariala"
      appIconUrl="https://avatars.githubusercontent.com/u/87638650?s=200&v=4"
      network={devnet}
    >
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Toaster richColors position={"top-center"} />
          <NextNProgress
            color="#1ab98b"
            height={6}
            options={{ showSpinner: false }}
          />

          <Component {...pageProps} />

          <SelectNetworkDialog></SelectNetworkDialog>
        </QueryClientProvider>
      </Provider>
    </MicroStacks.ClientProvider>
  );
}
export default MyApp;
