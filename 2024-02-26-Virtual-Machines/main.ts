import { VirtualMachine } from "./vm";
const { opcodes } = require('./opcodes');

const vm = new VirtualMachine();
vm.load([opcodes.HALT]);
vm.run();
console.log(vm);