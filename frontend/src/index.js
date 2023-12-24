import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./App";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <AppRouter />
  </ChakraProvider>
);
