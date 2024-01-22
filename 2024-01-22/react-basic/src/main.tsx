import "./style.css";
// import heroList from './datos.json';

import React from "react";
import { createRoot } from 'react-dom/client';

const app = document.getElementById("app")!;
const root = createRoot(app);

const elem1 = React.createElement("div", null, ["&copy; Pintado por React"]);
const elem2 = <div>&copy; Pintado por React</div>;

root.render(elem2);
