import codeops from "./codeops.json";
import opcodes from "./opcodes.json";

type VMState = "halted" | "running" | "error";

export class VirtualMachine {
  state: VMState = "halted";
  code: number[] = [];
  memory: number[] = [];
  ip: number = 0;
  flag: boolean = false;
  trace: boolean;
  stack: number[] = [];

  constructor({ trace = false }: { trace: boolean }) {
    this.trace = trace;
  }

  push(x: number) {
    this.stack.push(x);
  }

  pop(): number {
    const top = this.stack.pop();
    if (top === undefined) {
      throw new Error(`VirtualMachine.pop: stack underflow!`);
    }
    return top;
  }

  load(code: number[], entryPoint: number = 0) {
    this.code = code;
    this.ip = entryPoint;
    this.stack = [];
    this.state = "running";
  }

  setMem(mem: number[]) {
    this.memory = mem;
  }

  step() {
    const next = () => {
      if (this.ip < 0 || this.ip > this.code.length) {
        throw new Error(`VirtualMachine.step.next: ip out of bounds`);
      }
      const curr = this.code[this.ip];
      this.ip++;
      return curr;
    };
    const pop = () => {
      const value = this.stack.pop();
      if (value === undefined) {
        throw new Error(`VirtualMachine.step.pop: stack underflow!`);
      }
      return value;
    };
    const push = (...args: number[]) => this.stack.push(...args);

    const memAddr = (addr: number): number => {
      if (addr < 0 || addr > this.memory.length) {
        throw new Error(`Address out of memory: ${addr}`);
      }
      return addr;
    };

    const arithmetic = (fn: (a: number, b: number) => number) => {
      const b = pop();
      const a = pop();
      const result = fn(a, b);
      if (Number.isNaN(result) || result === Infinity) {
        throw new Error(`VirtualMachine.step.artithmetic: Not a number!`);
      }
      push(result);
    };

    const comparison = (fn: (a: number, b: number) => boolean) => {
      const b = pop();
      const a = pop();
      this.flag = fn(a, b);
    };

    this.traceBefore();

    const opcode = next();

    switch (opcode) {
      case opcodes.HALT: {
        this.state = "halted";
        break;
      }
      case opcodes.PUSH: {
        const value = next();
        push(value);
        break;
      }
      case opcodes.POP: {
        pop();
        break;
      }

      case opcodes.DUP: {
        const val = pop();
        push(val, val);
        break;
      }
      case opcodes.DUP2: {
        const b = pop();
        const a = pop();
        push(a, b, a, b);
        break;
      }

      case opcodes.INC: {
        const val = pop();
        push(val + 1);
        break;
      }
      case opcodes.DEC: {
        const val = pop();
        push(val - 1);
        break;
      }

      case opcodes.ADD:
        arithmetic((a, b) => a + b);
        break;

      case opcodes.SUB:
        arithmetic((a, b) => a - b);
        break;

      case opcodes.MUL:
        arithmetic((a, b) => a * b);
        break;

      case opcodes.DIV:
        arithmetic((a, b) => a / b);
        break;

      case opcodes.MOD:
        arithmetic((a, b) => a % b);
        break;

      case opcodes.LT: {
        comparison((a, b) => a < b);
        break;
      }
      case opcodes.GT: {
        comparison((a, b) => a > b);
        break;
      }
      case opcodes.LTE: {
        comparison((a, b) => a <= b);
        break;
      }
      case opcodes.GTE: {
        comparison((a, b) => a >= b);
        break;
      }
      case opcodes.EQ: {
        comparison((a, b) => a === b);
        break;
      }
      case opcodes.NEQ: {
        comparison((a, b) => a !== b);
        break;
      }

      case opcodes.BR: {
        const relAddr = next();
        this.ip += relAddr;
        break;
      }
      case opcodes.BRT: {
        const relAddr = next();
        if (this.flag) {
          this.ip += relAddr;
        }
        break;
      }
      case opcodes.BRF: {
        const relAddr = next();
        if (!this.flag) {
          this.ip += relAddr;
        }
        break;
      }

      case opcodes.LOAD: {
        const addr = pop();
        push(this.memory[memAddr(addr)]);
        break;
      }
      case opcodes.STORE: {
        const value = pop();
        const addr = pop();
        this.memory[memAddr(addr)] = value;
        break;
      }

      case opcodes.PR: {
        const top = this.stack.pop();
        console.log(top);
        break;
      }
      default: {
        throw new Error(`VirtualMachine.pop: unknown opcode ${opcode}`);
      }
    }

    this.traceAfter();
  }

  run() {
    while (this.state === "running") {
      this.step();
    }
  }

  traceStack() {
    return `[${this.stack.map((v) => String(v)).join(", ")}]`.padEnd(30);
  }
  traceMem() {
    return `[${this.memory.map((v) => String(v).padStart(3)).join("  ")}]`;
  }

  traceBefore() {
    if (!this.trace) {
      return;
    }
    const out = (s: string) => process.stdout.write(s);
    out(this.ip.toFixed().padStart(3, " "));
    out(":");
    out(this.flag ? "⚑ " : "  ");
    const op = codeops[this.code[this.ip]];
    if (op === null) {
      throw new Error(`Unknown opcode ${this.code[this.ip]}`);
    }
    const { name, nparams } = op;
    let instr = `${name}`;
    if (nparams > 0) {
      instr += this.code
        .slice(this.ip + 1, this.ip + 1 + nparams)
        .map((v) => ` ${v}`)
        .join("");
    }
    out(instr.padEnd(10, " "));
    out(`St: ${this.traceStack()} Mem: ${this.traceMem()}`);
    out(`\n`);
  }

  traceAfter() {
    if (!this.trace) {
      return;
    }
    const out = (s: string) => process.stdout.write(s);
    out("".padStart(16));
    out(`St: ${this.traceStack()} Mem: ${this.traceMem()}\n\n`);
  }
}
