import { readFile } from "fs/promises";
import { assemble } from "./asm";
import { VirtualMachine } from "./vm";

const [_runtime, _script, ...args] = process.argv;
if (args.length === 0) {
  console.error(`usage: bun run main.ts <asm-file>`);
  process.exit(1);
}

const [asmFile, ...rest] = args;
const opts: Record<string, boolean> = rest.reduce(
  (opts, a) => (a.startsWith("--") ? { ...opts, [a.slice(2)]: true } : opts),
  {}
);
const params = rest.filter((a) => !a.startsWith("--"));
const vm = new VirtualMachine({ trace: opts.trace });
const mem = Array.from({ length: 15 }).map((_, index) => index + 2);
vm.setMem(mem);
vm.load(assemble(await readFile(asmFile)));
for (const val of params) {
  vm.push(Number(val));
}
vm.run();
