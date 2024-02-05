const resultado = 5 * (4 + 15 / 3);
console.log(resultado);

// Versión asíncrona de la misma expresión

type Callback = (r: number) => void;

const asyncSum = (a: number, b: number, cb: Callback) => {
  setTimeout(() => cb(a + b), 2000);
};
const asyncMult = (a: number, b: number, cb: Callback) => {
  setTimeout(() => cb(a * b), 2000);
};
const asyncDiv = (a: number, b: number, cb: Callback) => {
  setTimeout(() => cb(a / b), 2000);
};

asyncDiv(15, 3, (r1) => {
  asyncSum(4, r1, (r2) => {
    asyncMult(5, r2, (r3) => {
      console.log(r3);
    });
  });
});
