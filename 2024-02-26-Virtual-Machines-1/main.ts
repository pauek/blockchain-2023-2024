import { VirtualMachine } from "./vm";
const { opcodes } = require("./opcodes");

const vm = new VirtualMachine();
vm.load([
  opcodes.PUSH, 2,
  opcodes.PUSH, -4,
  opcodes.EQ,
  opcodes.BRT, 4,

  opcodes.PUSH, -56,
  opcodes.PR,
  opcodes.HALT,

  opcodes.PUSH, 789,
  opcodes.PR,
  opcodes.HALT,
]);

vm.run();

