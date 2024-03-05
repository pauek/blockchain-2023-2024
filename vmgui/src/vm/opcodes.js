
const _op = (code, name, nargs = 0) => ({ code, name, nargs });

const _opcodeList = [
  _op(0, "HALT"),
  _op(1, "PUSH", 1),
  _op(2, "POP"),
  _op(3, "DUP"),
  _op(4, "DUP2"),

  _op(5, "INC"),
  _op(6, "DEC"),

  _op(10, "ADD"),
  _op(11, "SUB"),
  _op(12, "MUL"),
  _op(13, "DIV"),
  _op(14, "MOD"),

  _op(20, "LT"),
  _op(21, "GT"),
  _op(22, "LE"),
  _op(23, "GE"),
  _op(24, "EQ"),
  _op(25, "NEQ"),

  _op(30, "BR", 1),
  _op(31, "BRT", 1),
  _op(32, "BRF", 1),

  _op(100, "PR"),
];

export const opcode = {};
export const opcodeInfo = new Array(256);

_opcodeList.forEach((op) => {
  opcode[op.name] = op.code;
  opcodeInfo[op.code] = op;
});


