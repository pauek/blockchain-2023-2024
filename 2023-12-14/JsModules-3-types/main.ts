import { area, type Circle } from "./circle";
import type { Circle as CircleType } from './circle';

import { readFile } from 'node:fs/promises';

console.log(area(5.6));

const content = await readFile("package.json");
console.log(content.toString());