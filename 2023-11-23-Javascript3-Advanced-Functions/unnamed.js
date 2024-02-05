function max2_v1(a, b) {
  return a > b ? a : b;
}

let max2_v2 = function (a, b) {
  return a > b ? a : b;
};

let max2_v4 = max2_v2;

console.log(max2_v1(5, 9));

console.log((max2_v2)(14, 11));
// 1. Irse a max2_v2 (una variable) y coger lo que hay dentro.
// 2. Llamo a esa cosa con (14, 11).

let max2_v3 = 3;
// max2_v3(100, 150);

console.log(max2_v4(34, 39));