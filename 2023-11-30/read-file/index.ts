
import { readFileSync } from 'fs';

const text = readFileSync("package.json");
const json = JSON.parse(text.toString());
console.log(json);