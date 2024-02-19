"use client";

import { useEffect, useState } from "react";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // suscripción
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => {
      // cancelación
      clearInterval(interval);
    }
  }, []);

  const HH = time.getHours().toString().padStart(2, "0");
  const MM = time.getMinutes().toString().padStart(2, "0")
  const SS = time.getSeconds().toString().padStart(2, "0")
  return <div className="font-mono">
    {HH}:{MM}:{SS}
  </div>
  
}