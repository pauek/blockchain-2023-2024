import { readFile } from 'fs/promises';
import { assemble } from "./asm";
import { VirtualMachine } from "./vm";

const [_runtime, _script, ...args] = process.argv;
if (args.length === 0) {
  console.error(`usage: bun run main.ts <asm-file>`);
  process.exit(1);
}

const [asmFile, ...rest] = args;
const vm = new VirtualMachine();
vm.load(assemble(await readFile(asmFile)));
for (const val of rest) {
  vm.push(Number(val));
}
vm.run();

