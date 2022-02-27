import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "components/GlobalStyles";
import { THEME } from "./constants";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={THEME}>
      <App />
      <GlobalStyles />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
