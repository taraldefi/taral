import "@styles/globals.scss";
import "taral-ui/build/index.scss";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "jotai";
import SelectNetworkDialog from "@components/selectNetworkDialog";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
      <SelectNetworkDialog></SelectNetworkDialog>
    </Provider>
  );
}
export default MyApp;
