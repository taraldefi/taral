import IdleTimeOutHandler from "@components/idleTimeOutHandler";
import { Toaster } from "sonner";
import SelectNetworkDialog from "@components/selectNetworkDialog";
import "@styles/globals.scss";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import "taral-ui/build/index.scss";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.style.display = "none";
    }
  }, []);
  const queryClient = new QueryClient();
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <Toaster richColors position={"top-center"} />
        <NextNProgress
          color="#1ab98b"
          height={6}
          options={{ showSpinner: false }}
        />
        <Component {...pageProps} />

        {/* <IdleTimeOutHandler
        onActive={() => {}}
        onIdle={() => {}}
        onLogout={async () => {
          await router.push("/auth/login");
        }}
      /> */}

        <SelectNetworkDialog></SelectNetworkDialog>
      </QueryClientProvider>
    </Provider>
  );
}
export default MyApp;
