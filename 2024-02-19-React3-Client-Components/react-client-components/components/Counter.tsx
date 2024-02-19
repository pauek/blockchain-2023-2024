"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  const incr = () =>
    setCount((n) => {
      return n > 0 ? n - 1 : n;
    });

  const decr = () => setCount((n) => n + 1);

  return (
    <div className="flex flex-row gap-3">
      <button className="border px-4" onClick={incr}>
        -1
      </button>
      <span className="text-4xl font-bold">{count}</span>
      <button className="border px-4" onClick={decr}>
        +1
      </button>
    </div>
  );
}
