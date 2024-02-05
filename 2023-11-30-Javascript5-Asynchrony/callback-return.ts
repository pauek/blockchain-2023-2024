
function sum(a: number, b: number) {
	return a + b;
}

function sumCallback(a: number, b: number, callback: (result:number) => unknown) {
  const r = a + b;
  callback(r);
}

console.log(sum(4, 5));

sumCallback(41, 50, (r) => {
  console.log(r);
});