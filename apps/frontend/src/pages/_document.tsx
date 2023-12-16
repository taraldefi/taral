import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />

        <body>
          <div id="globalLoader">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
              alt=""
            />
          </div>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
