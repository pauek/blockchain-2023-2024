import { opcode } from "./opcodes.js";
import VirtualMachine from "./vm.js";

const vm = new VirtualMachine();

// if (3 < 7) 5 + 6 else 10 * 10;
const test_if = [
  /*0*/
  opcode.PUSH, 7, 
  opcode.PUSH, 3,
  opcode.LT,
  /*5*/
  opcode.BRF, 13,
  opcode.PUSH, 5, 
  opcode.PUSH, 6,
  opcode.ADD,
  opcode.HALT,
  /*13*/
  opcode.PUSH, 10, 
  opcode.PUSH, 10,
  opcode.MUL,
  opcode.HALT,
];

const bucle100 = [
  opcode.PUSH, 1,
  opcode.DUP,
  opcode.PUSH, 100,
  opcode.LT,
  opcode.BRT, 9,
  opcode.HALT,
  opcode.DUP,
  opcode.PR,
  opcode.INC,
  opcode.BR, 2,
];

vm.start(bucle100);
vm.run();

console.log(vm.ip, vm.stack, vm.state);
