let f = (x) => x + 1; // f(x) = x + 1

let arithmeticFunctions = [
  (a, b) => a + b,
  (a, b) => a - b,
  (a, b) => a * b,
  (a, b) => a / b,
  (a, b) => a % b,
];

const fMaker = () => () => 42;

function show(f) {
  console.log(f());
}

console.log(f(11));
console.log(arithmeticFunctions[0](5, 4));
console.log(arithmeticFunctions[1](5, 4));
console.log(fMaker()());
show(() => "hola, mundo!");
