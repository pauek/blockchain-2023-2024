import "./style.css";
import heroList from "./datos.json";

import React from "react";
import { createRoot } from "react-dom/client";

const [_, hero1] = heroList;

const app = document.getElementById("app")!;
const root = createRoot(app);

const título = "La maravillosa historia de React";

const heroVDom = (
	<div>
		{hero1.first} {hero1.last} ({hero1.age})
	</div>
);

const estáLloviendo = true;

const tipoElemento = "date";

let lloviendo = null;
if (estáLloviendo) {
	lloviendo = <div>Está lloviendo</div>;
}

root.render(
	<main>
		Pintado por <em>React</em> asdkjasldkfj lakjsl kja askdjflksaj lakj <strong>alksj</strong>
		<h1>{título}</h1>
		<table>
			<tbody>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>string</code>
					</td>
					<td style={{ border: "1px solid black" }}>{"esto es un string"}</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>number</code>
					</td>
					<td style={{ border: "1px solid black" }}>{12345}</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>Object</code>
					</td>
					<td style={{ border: "1px solid black" }}>ERROR</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>undefined</code>
					</td>
					<td style={{ border: "1px solid black" }}>{undefined}</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>null</code>
					</td>
					<td style={{ border: "1px solid black" }}>{null}</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>true</code>
					</td>
					<td style={{ border: "1px solid black" }}>{true}</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>false</code>
					</td>
					<td style={{ border: "1px solid black" }}>{false}</td>
				</tr>
				<tr>
					<td style={{ border: "1px solid black" }}>
						<code>Array</code>
					</td>
					<td style={{ border: "1px solid black" }}>{[1, 2, "blabla", false, null]}</td>
				</tr>
			</tbody>
		</table>
		<p>2 + 2 = {2 + 2}</p>
		<div>Number of heroes: {heroList.length}</div>
		{/* if (estaLloviendo) <p>Está lloviendo</p> */}
		{estáLloviendo && <p>Está lloviendo</p>}
		{estáLloviendo || <p>Hace Sol</p>}
		{estáLloviendo ? <div>Llueve</div> : <div>Soleado</div>}
		<p>Resultado: {lloviendo}</p>
		<h2>Heroes</h2>
		{heroList.map((hero) => (
			<div>
				{hero.first} {hero.last} [{hero.age}]
			</div>
		))}
		<div style={{ height: "10em" }}></div>
		<input type={tipoElemento} value="Boom" />
		<input type="text" value="Cámbiame" />
		{[1, 2, 3, 4].map((sz) => (
			<div
				style={{
					width: sz * 30,
					height: sz * 30,
					backgroundColor: "red",
					border: "1px solid black",
				}}
			></div>
		))}
	</main>
);
