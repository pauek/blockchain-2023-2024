import opcodes from './opcodes.json';

export const assemble = (buf: Buffer | string) => {
  const code = buf instanceof Buffer ? buf.toString() : buf;
  const lines = code.split("\n").map(ln => ln.trim());
  const bytecode1: (number | string)[] = [];
  const labels = new Map<string, number>();

  // First pass: substitute mnemonics and numbers (+ labels)
  let ip = 0;
  for (const line of lines) {
    if (line.endsWith(":")) {
      const label = line.replaceAll(":", "");
      labels.set(label, ip);
      continue;
    }
    const [op, ...params] = line.split(/\s+/);
    const opcode = (opcodes as Record<string, number>)[op];
    if (opcode === undefined) {
      throw new Error(`Unknown instruction ${op}`);
    }
    bytecode1.push(opcode);
    for (const p of params) {
      const n = Number(p);
      bytecode1.push(Number.isNaN(n) ? p : n);
    }
    ip += 1 + params.length;
  }

  // Second pass: substitute labels
  let bytecode2: number[] = [];
  for (let i = 0; i < bytecode1.length; i++) {
    const byte = bytecode1[i];
    if (typeof byte === "string") {
      const target = labels.get(byte);
      if (target === undefined) {
        throw new Error(`Label "${byte} not found!`);
      }
      bytecode2[i] = target - (i+1);
    } else {
      bytecode2[i] = byte;
    }
  }

  return bytecode2;
}