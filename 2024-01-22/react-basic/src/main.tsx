import "./style.css";
// import heroList from './datos.json';

import React from "react";
import { render } from "react-dom";

const app = document.getElementById("app")!;

const elem1 = React.createElement("div", null, ["&copy; Pintado por React"]);
const elem2 = <div>&copy; Pintado por React</div>;

render(elem2, app);
