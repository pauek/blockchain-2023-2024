export const opcodes = [
  { name: "HALT", opcode: 0, nparams: 0 },

  { name: "PUSH", opcode: 1, nparams: 1 },
  { name: "POP", opcode: 2, nparams: 0 },

  { name: "ADD", opcode: 5, nparams: 0 },
  { name: "SUB", opcode: 6, nparams: 0 },
  { name: "MUL", opcode: 7, nparams: 0 },
  { name: "DIV", opcode: 8, nparams: 0 },
  { name: "MOD", opcode: 9, nparams: 0 },

  { name: "PR", opcode: 100, nparams: 0 },
];
