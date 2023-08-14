import "@styles/globals.scss";
import "taral-ui/build/index.scss";
import type { AppProps } from "next/app";
import React from "react";
import { Provider } from "jotai";
declare module "axios" {
  interface AxiosResponse {
    statusCode: number;
  }
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}
export default MyApp;
