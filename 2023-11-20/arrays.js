
let a = [];
let b = [1, 2, 3];
let c = ["ho", null, true, undefined, NaN];
let d = ["", "*", "**", "***"];

let e = new Array(5);

console.log(a[-1]);
a[0] = 7;
a[10] = -13;
a[100] = 0;

b[0] = -1;
c[4] = 0.0;
d[0] = "**";

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log(e);

