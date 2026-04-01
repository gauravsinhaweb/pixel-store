import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { FilterProvider } from "./context/FilterContext";
import { AppProvider } from "./context/AppContext";

ReactDOM.render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      AppProvider,
      null,
      React.createElement(FilterProvider, null, React.createElement(App))
    )
  ),
  document.getElementById("root")
);
