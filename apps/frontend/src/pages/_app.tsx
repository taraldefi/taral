import "@styles/globals.scss";
import "taral-ui/build/index.scss";
import type { AppProps } from "next/app";
import React, { useEffect } from "react";
import { Provider } from "jotai";
import SelectNetworkDialog from "@components/selectNetworkDialog";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const loader = document.getElementById("globalLoader");
      if (loader) loader.style.display = "none";
    }
  }, []);
  return (
    <Provider>
      <NextNProgress
        color="#1ab98b"
        height={6}
        options={{ showSpinner: false }}
      />
      <Component {...pageProps} />
      <SelectNetworkDialog></SelectNetworkDialog>
    </Provider>
  );
}
export default MyApp;
