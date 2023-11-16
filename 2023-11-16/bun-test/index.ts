
const file = Bun.file("datos.txt");
const text = await file.text();
const lineas = text.split('\n');
console.log(lineas);