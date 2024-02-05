fetch("https://www.google.commm")
  .then((response) => response.text())
  .then((textoDeLaRespuesta) => console.log(textoDeLaRespuesta))
  .catch((e) => console.error("Algo ha pasao", e));
