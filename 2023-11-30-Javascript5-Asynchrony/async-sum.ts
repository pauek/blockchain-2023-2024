
function sumCallback(a: number, b: number, callback: (result:number) => unknown) {
  const r = a + b;
  setTimeout(() => callback(r), 2000);
}

console.log("Begin");
sumCallback(41, 50, (r) => {
  console.log("Result is", r);
})
console.log("End");
