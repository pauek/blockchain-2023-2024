import { VirtualMachine } from "./vm";
const { opcodes } = require('./opcodes');

const vm = new VirtualMachine();
vm.load([
  opcodes.PUSH, 5,
  opcodes.PUSH, 12,
  opcodes.ADD,
  opcodes.HALT,
]);
vm.run();

console.log(vm.pop());