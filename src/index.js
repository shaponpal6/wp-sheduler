import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Router2 from "./router2";
import * as serviceWorker from "./serviceWorker";


const targets = document.querySelectorAll(".erw-root");
Array.prototype.forEach.call(targets, (target) => {


  ReactDOM.render(
    <div>
      <Router2/>
      <App settings={settings} />
    </div>,
    target
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
