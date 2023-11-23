let f = function (x) { return x + 1; }; // f(x) = x + 1

let arithmeticFunctions = [
  function (a, b) {
    return a + b;
  },
  function (a, b) {
    return a - b;
  },
  function (a, b) {
    return a * b;
  },
  function (a, b) {
    return a / b;
  },
  function (a, b) {
    return a % b;
  },
];

function fMaker() {
  return function () {
    return 42;
  };
}

function show(f) {
    console.log(f());
}

console.log(f(11));
console.log(arithmeticFunctions[0](5, 4));
console.log(arithmeticFunctions[1](5, 4));
console.log(fMaker()());
show(function () { return "hola, mundo!"; });
