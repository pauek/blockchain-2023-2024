import { readFile } from 'fs/promises';
import { VirtualMachine } from "./vm";
import { assemble } from "./asm";

const [_runtime, _tsfile, ...args] = process.argv;
if (args.length === 0) {
  console.error(`usage: bun run main.ts <script.asm>`);
  process.exit(1);
}
const [script] = args;

const vm = new VirtualMachine({ trace: true });
const asm = await readFile(script);
const bytecode = assemble(asm);
vm.load(bytecode);
vm.run();

