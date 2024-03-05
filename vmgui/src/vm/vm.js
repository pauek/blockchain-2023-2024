import { opcode, opcodeInfo } from "./opcodes.js";
import { sprintf } from 'sprintf-js';

export default class VirtualMachine {
  constructor() {
    this.stack = [];
    this.ip = 0;
    this.flag = false;
    this.program = [];
    this.state = "halted";
    this.printFunc = (val) => console.log(val);
  }

  _traceBegin() {
    this._traceAcum = sprintf("%04d: ", this.ip);
    const op = this.program[this.ip];
    const { name, nargs } = opcodeInfo[op];
    let instr = name;
    for (let i = 0; i < nargs; i++) {
      instr += ` ${this.program[this.ip + 1 + i]}`;
    }
    this._traceAcum += sprintf("%-15s %s ", instr, this.flag ? "*" : " ");
    this._traceAcum += sprintf("[%s]", this.stack.join(", "));
  }

  _traceEnd() {
    console.log(this._traceAcum + ` -> [${this.stack.join(", ")}]`);
  }

  setPrintFunc(f) {
    this.printFunc = f;
  }

  push(n) {
    this.stack.push(n);
  }

  pop() {
    this.stack.pop();
  }

  start(code, entryPoint = 0) {
    this.entryPoint = entryPoint;
    this.program = code;
    this.ip = entryPoint;
    this.state = "running";
  }

  reset() {
    this.ip = this.entryPoint;
    this.state = "running";
    this.stack = [];
  }

  run() {
    while (this.ip < this.program.length && this.state === "running") {
      this.step();
    }
  }

  step() {
    if (this.state !== "running") {
      return;
    }

    const next = () => {
      if (this.ip >= this.program.length) {
        this.state = "error";
        return 0;
      }
      return this.program[this.ip++];
    };
    const push = (...args) => this.stack.push(...args);
    const pop = () => this.stack.pop();
    const top = (n) => this.stack.slice(-n);

    const arithmetic = (f) => {
      const b = pop();
      const a = pop();
      push(f(a, b));
    };
    const logical = (f) => {
      const b = pop();
      const a = pop();
      this.flag = f(a, b);
    };

    // this._traceBegin();

    const op = next();
    switch (op) {
      case opcode.HALT:
        this.state = "halted";
        break;

      case opcode.PUSH:
        push(next());
        break;
      case opcode.POP:
        pop();
        break;
      case opcode.DUP:
        push(...top(1));
        break;
      case opcode.DUP2:
        push(...top(2));
        break;

      case opcode.INC:
        push(pop() + 1);
        break;
      case opcode.DEC:
        push(pop() - 1);
        break;

      case opcode.ADD:
        arithmetic((a, b) => a + b);
        break;
      case opcode.SUB:
        arithmetic((a, b) => a - b);
        break;
      case opcode.MUL:
        arithmetic((a, b) => a * b);
        break;
      case opcode.DIV:
        arithmetic((a, b) => Math.trunc(a / b));
        break;
      case opcode.MOD:
        arithmetic((a, b) => a % b);
        break;

      case opcode.LT:
        logical((a, b) => a < b);
        break;
      case opcode.GT:
        logical((a, b) => a > b);
        break;
      case opcode.LE:
        logical((a, b) => a <= b);
        break;
      case opcode.GE:
        logical((a, b) => a >= b);
        break;
      case opcode.EQ:
        logical((a, b) => a === b);
        break;
      case opcode.NEQ:
        logical((a, b) => a !== b);
        break;

      case opcode.BR:
        this.ip = next();
        break;

      case opcode.BRT: {
        const addr = next();
        if (this.flag) {
          this.ip = addr;
        }
        break;
      }
      case opcode.BRF: {
        const addr = next();
        if (!this.flag) {
          this.ip = addr;
        }
        break;
      }
      case opcode.PR:
        this.printFunc(pop());
        break;

      default:
        this.state = "error";
    }

    // this._traceEnd();
  }

  disassemble() {
    const instructions = [];
    let i = 0;
    let current = null;
    while (i < this.program.length) {
      if (i == this.ip) {
        current = instructions.length;
      }
      const info = opcodeInfo[this.program[i]];
      let instr = `${info.name}`;
      for (let a = 0; a < info.nargs; a++) {
        instr += ` ${this.program[++i]}`;
      }
      i++;
      instructions.push(instr);
    }
    return { instructions, current };
  }

  assemble(src) {
    let code = []; // array de bytecode
    let bytes = src.split(/\s+/).filter(s => s !== "");
    let labels = new Map();

    const isLabel = (s) => s.endsWith(":");

    let ip = 0;
    for (const byte of bytes) {
      if (isLabel(byte)) {
        labels.set(byte.slice(0, -1), ip);
      } else {
        ip++;
      }
    }

    let i = 0;
    while (i < bytes.length) {
      const name = bytes[i++];
      if (isLabel(name)) {
        continue;
      }
      if (!opcode.hasOwnProperty(name.toUpperCase())) {
        throw new Error(`Instruction ${name} not found`);
      }
      const op = opcode[name.toUpperCase()];
      code.push(op);

      const info = opcodeInfo[op];
      for (let a = 0; a < info.nargs; a++) {
        const val = bytes[i++];
        if (labels.has(val)) {
          code.push(labels.get(val));
        } else {
          code.push(Number(val));
        }
      }
    }

    this.program = code;
  }
}
