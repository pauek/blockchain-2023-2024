
function sum(a: number, b: number): Promise<number> {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(a + b), 2000);
  })
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve, _) => {
    setTimeout(() => resolve(), ms);
  });
}
