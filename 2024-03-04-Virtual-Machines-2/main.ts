import { readFile } from 'fs/promises';
import { VirtualMachine } from "./vm";
import { assemble } from "./asm";

const [_runtime, _tsfile, ...argv] = process.argv;
if (argv.length === 0) {
  console.error(`usage: bun run main.ts <script.asm>`);
  process.exit(1);
}
const [script, ...args] = argv;
const vm = new VirtualMachine({ trace: true });
const asm = await readFile(script);
const bytecode = assemble(asm);
vm.load(bytecode);

for (const arg of args) {
  const value = Number(arg);
  if (Number.isNaN(value)) {
    throw new Error(`Argument must be a number`);
  }
  vm.push(value);
}

vm.run();



