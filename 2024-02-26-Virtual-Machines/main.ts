import { VirtualMachine } from "./vm";
import opcodes from './opcodes.json';

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

