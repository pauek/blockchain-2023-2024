console.log("Loading circle.js");

const circumference = (r) => 2 * Math.PI * r;
const area = (r) => Math.PI * r * r;

module.exports = {
    circumference,
    area
}

for (let i = 1; i <= 100; i++) {
	module.exports[`add${i}`] = (x) => x + i;
}
