import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import globalloader from "../../src/loader";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <head>
          <style>{globalloader}</style>
        </head>
        <body>
          <div id={"globalLoader"}>
            <div className="loader"></div>
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
