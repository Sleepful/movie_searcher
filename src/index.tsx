import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles.css";
import Search from "./views/Search";
import PageView from "./components/Layout/PageView";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <PageView>
        <Search />
      </PageView>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
