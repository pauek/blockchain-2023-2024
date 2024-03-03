const opcodeList = [
  { name: "HALT", opcode: 0, nparams: 0 },

  { name: "PUSH", opcode: 1, nparams: 1 },
  { name: "POP", opcode: 2, nparams: 0 },

  { name: "DUP", opcode: 3, nparams: 0 },
  { name: "DUP2", opcode: 4, nparams: 0 },

  { name: "ADD", opcode: 5, nparams: 0 },
  { name: "SUB", opcode: 6, nparams: 0 },
  { name: "MUL", opcode: 7, nparams: 0 },
  { name: "DIV", opcode: 8, nparams: 0 },
  { name: "MOD", opcode: 9, nparams: 0 },

  { name: "LT", opcode: 10, nparams: 0 },
  { name: "GT", opcode: 11, nparams: 0 },
  { name: "LTE", opcode: 12, nparams: 0 },
  { name: "GTE", opcode: 13, nparams: 0 },
  { name: "EQ", opcode: 14, nparams: 0 },
  { name: "NEQ", opcode: 15, nparams: 0 },

  { name: "BR", opcode: 20, nparams: 1 },
  { name: "BRT", opcode: 21, nparams: 1 },
  { name: "BRF", opcode: 22, nparams: 1 },

  { name: "PR", opcode: 100, nparams: 0 },
];

let opcodes: Record<string, number> = {};
for (const { name, opcode } of opcodeList) {
  opcodes[name] = opcode;
}
Bun.write("opcodes.json", JSON.stringify(opcodes, null, 2));

module.exports = {
  opcodes,
};
