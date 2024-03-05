import "./VMGui.css";
import VirtualMachine from "./vm/vm.js";
import { opcode } from "./vm/opcodes.js";
import { useState } from "react";
import programs from './vm/programs';

const vm = new VirtualMachine();

const bucle100 = [
  opcode.PUSH,
  1,
  opcode.DUP,
  opcode.PUSH,
  50,
  opcode.LT,
  opcode.BRT,
  9,
  opcode.HALT,
  opcode.DUP,
  opcode.PR,
  opcode.INC,
  opcode.BR,
  2,
];

vm.start(bucle100);

function useRefresh() {
  // Truco para refrescar la pantalla
  const [tick, setTick] = useState(0);
  return () => setTick(tick + 1);
}

function VMGui() {
  const [value, setValue] = useState("0");
  const [src, setSrc] = useState("");
  const [output, setOutput] = useState("");
  const refresh = useRefresh();

  vm.setPrintFunc((val) => setOutput((output) => output + `${val}\n`));

  const push = () => {
    vm.push(Number(value));
    refresh();
  };
  const pop = () => {
    vm.pop();
    refresh();
  };
  const step = () => {
    vm.step();
    refresh();
  };
  const reset = () => {
    vm.reset();
    refresh();
    setOutput("");
  }
  const runi = () => {
    let interval = setInterval(() => {
      if (vm.state === "running") {
        vm.step();
        refresh();
      } else {
        clearInterval(interval);
      }
    }, 100);
  };
  const run = () => {
    let output = "";
    vm.setPrintFunc((x) => (output += `${x}\n`));
    vm.run();
    setOutput(output);
    refresh();
  };
  const assemble = () => {
    vm.assemble(src);
    refresh();
  }
  const changeSrc = (e) => {
    setSrc(programs[e.target.value].slice(1));
  }

  const { instructions, current } = vm.disassemble();

  return (
    <main>
      <header>
        <h2>VM is {vm.state}</h2>
        <input type="number" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={push}>push</button>
        <div className="space" />
        <button onClick={pop}>pop</button>
        <div className="space" />
        <button onClick={step}>step</button>
        <div className="space" />
        <button onClick={reset}>reset</button>
        <div className="space" />
        <button onClick={run}>run</button>
        <div className="space" />
        <button onClick={runi}>run i</button>
        <div className="space" />
        <button onClick={assemble}>assemble</button>
      </header>
      <div id="panels">
        <div id="stack">
          <h4>Stack</h4>
          {vm.stack.map((value) => (
            <div className="value">{value}</div>
          ))}
        </div>
        <div id="code">
          <h4>Code</h4>
          {instructions.map((instr, i) => (
            <div className={"instruction" + (i === current ? " current" : "")}>
              {instr}
            </div>
          ))}
        </div>
        <div id="editor">
          <select onChange={changeSrc}>
            {Object.keys(programs).map(name => <option>{name}</option>)}
          </select>
          <textarea value={src} onChange={(e) => setSrc(e.target.value)}></textarea>
          <pre id="output">{output}</pre>
        </div>
      </div>
    </main>
  );
}

export default VMGui;
