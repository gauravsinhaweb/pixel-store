import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { FilterProvider } from "./context/FilterContext";
import { AppProvider } from "./context/AppContext";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
