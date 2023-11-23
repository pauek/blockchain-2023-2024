const makeCounter = (initial = 0) => {
  let count = initial;
  return () => {
    const result = count;
    count++;
    return result;
  };
};

const c1 = makeCounter();
const c2 = makeCounter(10);
console.log(c1(), c1(), c1());
console.log(c2(), c2(), c2());

