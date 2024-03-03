import opcodes from "./opcodes.json";

const removeColon = (s: string) => s.replaceAll(":", "");

const getOpcode = (op: string) => {
  const table = opcodes as Record<string, number>;
  if (op in table) {
    return table[op];
  } else {
    throw new Error(`Unknown opcode "${op}"`);
  }
};

const toNumber = (x: string): number | string => {
  const n = Number(x);
  return Number.isNaN(n) ? x : n;
}

const translateLabels = (labels: Map<string, number>) => (x: number | string, addr: number): number => {
  if (typeof x === "number") {
    return x;
  }
  const targetAddr = labels.get(x);
  if (targetAddr === undefined) {
    throw new Error(`Label ${x} not found`);
  }
  return targetAddr - (addr + 1); // Jump relative to next instruction
}


// Assembly
export const assemble = (asmCode: string | Buffer): number[] => {
  const asm = asmCode instanceof Buffer ? asmCode.toString() : asmCode;
  const lines = asm.trim().split("\n");

  // Translate opcodes + assign positions to labels
  let ip = 0;
  const labels = new Map<string, number>();
  const code: (number | string)[] = [];

  for (const line of lines) {
    const [op, ...rest] = line.trim().split(/\s+/);
    if (op.endsWith(":")) {
      labels.set(removeColon(op), ip);
    } else {
      code.push(getOpcode(op), ...rest.map(toNumber));
      ip += 1 + rest.length;
    }
  }

  // Translate labels
  return code.map(translateLabels(labels));
};
