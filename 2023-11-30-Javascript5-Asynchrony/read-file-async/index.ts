
import { readFile } from 'fs';

console.log("Begin");
readFile("package.json", (err, text) => {
  if (err) {
    console.error(err);
    return;
  }
  const json = JSON.parse(text.toString());
  console.log(json);
});
console.log("End");
