import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { theme as dark } from "./themes/dark";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={dark}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
