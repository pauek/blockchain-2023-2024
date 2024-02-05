const day: string = "wensdey";
let dia: string = "";

switch (day) {
  case "monday":
    dia = "lunes";
    break;
  case "tuesday":
    dia = "martes";
    break;
  case "wednesday":
    dia = "miércoles";
    break;
  case "thursday":
    dia = "jueves";
    break;
  default:
    dia = "otro";
    break;
}

console.log(dia);
