// Generate opcodes.json with "bun run opcodes.ts"
import opcodes from './opcodes.json';
import codeops from './codeops.json';

type VMState = "halted" | "running" | "error";

export class VirtualMachine {
  state: VMState = "halted";
  code: number[] = [];
  ip: number = 0;
  flag: boolean = false;
  trace: boolean = false;
  memory: number[] = [];
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
      throw new Error(
        `VirtualMachine.pop: stack underflow!`
      );
    }
    return top;
  }

  load(code: number[], entryPoint: number = 0) {
    this.code = code;
    this.ip = entryPoint;
    this.stack = [];
    this.state = "running";
  }

  setMemSize(n: number) {
    this.memory = Array.from({ length: n }).map(() => Math.floor(Math.random() * 255));
  }

  _checkIp() {
    if (this.ip < 0 || this.ip >= this.code.length) {
      throw new Error(
        `VirtualMachine.step.next: ip out of bounds`
      );
    }
  }

  step() {
    const next = () => {
      this._checkIp();
      const curr = this.code[this.ip];
      this.ip++;
      return curr;
    };
    const pop = () => {
      const value = this.stack.pop();
      if (value === undefined) {
        throw new Error(
          `VirtualMachine.step.pop: stack underflow!`
        );
      }
      return value;
    };
    const push = (...args: number[]) =>
      this.stack.push(...args);

    const top = (n: number = 1) => this.stack.slice(-n);

    const checkAddr = (addr: number) => {
      if (addr < 0 || addr >= this.memory.length) {
        throw new Error(`Segmentation Fault (${addr})`);
      }
      return addr;
    }

    const arithmetic = (
      fn: (a: number, b: number) => number
    ) => {
      const b = pop();
      const a = pop();
      const result = fn(a, b);
      if (Number.isNaN(result) || result === Infinity) {
        throw new Error(
          `VirtualMachine.step.artithmetic: Not a number!`
        );
      }
      push(result);
    };

    if (this.trace) {
      this.traceBefore();
    }

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
        push(...top());
        break;
      }
      case opcodes.DUP2: {
        push(...top(2));
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
        const b = pop();
        const a = pop();
        this.flag = a < b;
        break;
      }
      case opcodes.GT: {
        const b = pop();
        const a = pop();
        this.flag = a > b;
        break;
      }
      case opcodes.LTE: {
        const b = pop();
        const a = pop();
        this.flag = a <= b;
        break;
      }
      case opcodes.GTE: {
        const b = pop();
        const a = pop();
        this.flag = a >= b;
        break;
      }
      case opcodes.EQ: {
        const b = pop();
        const a = pop();
        this.flag = a === b;
        break;
      }
      case opcodes.NEQ: {
        const b = pop();
        const a = pop();
        this.flag = a !== b;
        break;
      }

      case opcodes.INC: {
        const top = pop();
        push(top + 1);
        break;
      }
      case opcodes.DEC: {
        const top = pop();
        push(top - 1);
        break;
      }

      case opcodes.SWAP: {
        const b = pop();
        const a = pop();
        push(b, a);
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
        push(this.memory[checkAddr(addr)]);
        break;
      }
      case opcodes.STORE: {
        const value = pop();
        const addr = pop();
        this.memory[checkAddr(addr)] = value;
        break;
      }

      case opcodes.PR: {
        const top = this.stack.pop();
        console.log(top);
        break;
      }
      default: {
        throw new Error(
          `VirtualMachine.pop: unknown opcode ${opcode}`
        );
      }
    }

    if (this.trace) {
      this.traceAfter();
    }
  }

  run() {
    while (this.state === "running") {
      this.step();
    }
  }

  traceBefore() {
    const out = (s: string) => process.stdout.write(s);
    out(`${this.ip.toString().padStart(3)}: `);
    out(this.flag ? "* " : "  ");
    this._checkIp();
    const currByte = this.code[this.ip];
    const opInfo = codeops[currByte];
    if (opInfo === null) {
      throw new Error(`Unknown opcode ${currByte}`);
    }
    const { name, nparams } = opInfo;
    let column = `${name}`;
    for (let i = 1; i <= nparams; i++) {
      column += ` ${this.code[this.ip + i]}`;
    }
    out(column.padEnd(20));
    let stackStr = `[${this.stack.map(String).join(", ")}]`;
    out(stackStr.padEnd(20));
    out(`(${this.memory.map(String).join(", ")})\n`);
  }

  traceAfter() {
    
  }
}
