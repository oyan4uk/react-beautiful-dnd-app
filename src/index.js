import React from "react";
import ReactDOM from "react-dom";
import SimpleApp from "./views/SimpleApp";
import PaginagionApp from "./views/PaginagionApp";
import "./index.module.scss";

ReactDOM.render(
    <div className="app">
        <PaginagionApp />
        <SimpleApp />
    </div>,
    document.getElementById("app"),
);
