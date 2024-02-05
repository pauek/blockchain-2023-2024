
const { circumference } = require('./circumference');
const { area } = require('./area');

module.exports = {
    circumference,
    area
}

for (let i = 1; i <= 100; i++) {
	module.exports[`add${i}`] = (x) => x + i;
}
