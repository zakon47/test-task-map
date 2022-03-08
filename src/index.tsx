import "./assets/scss/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import { reportWebVitals } from "./reportWebVitals";
import { LocalStorageProvider } from "./utils/localStorage/provider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <LocalStorageProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </LocalStorageProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
