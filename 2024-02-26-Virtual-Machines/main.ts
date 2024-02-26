import { VirtualMachine } from "./vm";
const { opcodes } = require('./opcodes');

const vm = new VirtualMachine();
vm.load([
  opcodes.PUSH, 5,
  opcodes.PUSH, 12,
  opcodes.PUSH, 8,
  opcodes.PUSH, 5,
  opcodes.MOD,
  opcodes.DIV,
  opcodes.MUL,
  opcodes.HALT,
]);
vm.run();

console.log(vm.pop());