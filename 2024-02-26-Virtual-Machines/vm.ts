
type VMState = "halted" | "running" | "error";

export class VirtualMachine {
  state: VMState = "halted";
  code: number[] = [];
  ip: number = 0;
  flag: boolean = false;

  

}