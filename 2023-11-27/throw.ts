
function sum(a: any, b: any) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error(`Some parameters is not a number!`);
  }
  return a + b;
}

try {
  console.log(sum(3, 2));
  console.log(sum("a", "b"));
} catch (e) {
  console.log(e.name, e.message);
  // console.error(e);
}