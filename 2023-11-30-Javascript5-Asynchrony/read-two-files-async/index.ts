import { readFile } from "fs";

readFile("filename.txt", (err, filenameData) => {
  if (err) {
    throw new Error("Could not read 'filename.txt'");
  }
  const filename = filenameData.toString().trim();
  readFile(filename, (err, textData) => {
    if (err) {
      throw new Error(`Could not read "${filename}"`);
    }
    console.log("Message:", textData.toString());
  });
});
