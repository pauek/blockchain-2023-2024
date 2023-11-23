// 0
let y, min;
let cero = "0";

function showTime(hour, min, sec) { // 1
  const DD = (x) => {
    // 2
    return String(x).padStart(2, cero);
  }; // 2
  console.log(`${DD(hour)}:${DD(min)}:${DD(sec)}`);
} // 1

showTime(5, 12, 3);

let obj = {
    f: function () { // 1
        const g = () => /* 2 */ this.x * 2;
        return g() * g();
    }, // 1
    x: 5,
};

console.log(obj.f());