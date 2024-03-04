import { readFile } from 'fs/promises';
import { VirtualMachine } from "./vm";
import { assemble } from "./asm";

const vm = new VirtualMachine();
const asm = await readFile('asm/loop.asm');
const bytecode = assemble(asm);
vm.load(bytecode);

// vm.run();

