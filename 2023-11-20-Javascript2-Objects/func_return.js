function nonsensical(a) {
  a++; // This statement will never execute!
  return 42;
}

function useless() {
  let a = 1;
  let b = a + 1;
}

function sayHi(person) {
  if (person === "Adolf Hitler") {
    return;
  }
  console.log("Oh hi ${person}!");
}

function sayHi2(person) {
  if (person !== "Adolf Hitler") {
    console.log("Oh hi ${person}!");
  }
}

let a = 3;
let resultado = nonsensical(7);
console.log(resultado);
nonsensical(3);

let resultado2 = useless();
console.log(resultado2);
