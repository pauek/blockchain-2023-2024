"use client";

import { useState } from "react";

export default function OnOff() {
  const [state, setState] = useState(false);
  return (
    <div
      onClick={() => setState(prevState => !prevState)}
      className={`w-[10em] h-[10em] ${
        state ? "bg-yellow-300" : "bg-yellow-900"
      }`}
    ></div>
  );
}
