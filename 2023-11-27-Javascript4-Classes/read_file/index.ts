import { readFileSync } from "fs";

// Leer fichero
try {
  const buffer = readFileSync("datos.txt");
  const text = buffer.toString();
  console.log(text);
} catch (e) {
  if (e instanceof Error) {
    console.log("No he podido leer el fichero, sorry.");
  }
}

// Conectarse a una web
try {
  const response = await fetch(`https://wwwwwwwwww.google.com/hola-que-tal`);
  const text = await response.text();
  console.log(text);
} catch (e) {
  console.log("Ha habido un error");
  // console.error(e);
}

