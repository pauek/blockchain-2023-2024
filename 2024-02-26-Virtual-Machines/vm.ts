const { opcodes } = require("./opcodes");

type VMState = "halted" | "running" | "error";

export class VirtualMachine {
  state: VMState = "halted";
  code: number[] = [];
  ip: number = 0;
  flag: boolean = false;

  stack: number[] = [];

  push(x: number) {
    this.stack.push(x);
  }

  pop(): number {
    const top = this.stack.pop();
    if (!top) {
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

  step() {
    const opcode = this.code[this.ip];
    this.ip++;

    switch (opcode) {
      case opcodes.HALT: {
        this.state = "halted";
        break;
      }
      default: {
        throw new Error(
          `VirtualMachine.pop: unknown opcode ${opcode}`
        );
      }
    }
  }

  run() {
    while (this.state === "running") {
      this.step();
    }
  }
}
