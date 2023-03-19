import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./App";
import Inicio from "./Inicio";

ReactDOM.render(
  <React.StrictMode>
	<App/>
  </React.StrictMode>,
  document.getElementById("root")
);
