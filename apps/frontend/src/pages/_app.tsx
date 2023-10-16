import IdleTimeOutHandler from "@components/idleTimeOutHandler";
import SelectNetworkDialog from "@components/selectNetworkDialog";
import "@styles/globals.scss";
import { Provider } from "jotai";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "taral-ui/build/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

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

      {/* <IdleTimeOutHandler
        onActive={() => {}}
        onIdle={() => {}}
        onLogout={async () => {
          await router.push("/auth/login");
        }}
      /> */}

      <SelectNetworkDialog></SelectNetworkDialog>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
    </Provider>
  );
}
export default MyApp;
