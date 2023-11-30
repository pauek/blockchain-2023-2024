
import { readFile } from 'fs/promises';

async function readJsonFromFile(filename: string): Promise<any> {
  const buffer = await readFile(filename);
  return JSON.parse(buffer.toString());
}

const data = await readJsonFromFile("package.json");
console.log(data);