"use client";

import { useState } from "react";

export default function Collapsible({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={
        (open ? "" : "h-[3em] overflow-clip") + " p-4 border cursor-pointer"
      }
      onClick={() => setOpen((open) => !open)}
    >
      {children}
    </div>
  );
}
