import { readFile } from 'fs/promises';
import { assemble } from "./asm";
import { VirtualMachine } from "./vm";

const [_runtime, _script, ...args] = process.argv;
if (args.length === 0) {
  console.error(`usage: bun run main.ts <asm-file>`);
  process.exit(1);
}

const vm = new VirtualMachine();
vm.load(assemble(await readFile(args[0])));
vm.run();

