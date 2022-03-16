import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FaucetContextProvider } from "./context/FaucetContext";

ReactDOM.render(
  <FaucetContextProvider>
    <BrowserRouter>
      {" "}
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </FaucetContextProvider>,
  document.getElementById("root")
);
