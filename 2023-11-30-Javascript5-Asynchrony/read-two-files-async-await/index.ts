import { readFile } from "fs/promises";

const readMessage = async () => {
  try {
    const filename = (await readFile("filename.txtttt")).toString();
    const data = (await readFile(filename)).toString();
    console.log("Message:", data);
  } catch (e) {
    console.error("Erroll!");
  }
};

await readMessage();
