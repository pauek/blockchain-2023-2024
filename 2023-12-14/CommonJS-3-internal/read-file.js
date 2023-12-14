
const fs = require('fs');

const content = fs.readFileSync('read-file.js');
console.log(`Empieza así: '${content.toString().slice(0, 50)}...'`);