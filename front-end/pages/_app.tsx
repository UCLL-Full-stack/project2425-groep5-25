import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/globals.css";
import Header from "@components/header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
