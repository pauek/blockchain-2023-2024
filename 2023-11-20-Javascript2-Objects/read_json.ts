
const text = await Bun.file("user.json").text();
const datos = JSON.parse(text);
const listUsuarios = datos.results;
const usuario = listUsuarios[0];

console.log(datos);

console.log(usuario.name.first, usuario.name.last);
