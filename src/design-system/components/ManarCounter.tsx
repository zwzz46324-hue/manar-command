import { useEffect, useRef, useState } from "react";
import "./ManarCounter.css";

type Props = {
  value: number | string;
  durationMs?: number;
  className?: string;
  suffix?: string;
};

export function ManarCounter({ value, durationMs = 900, className, suffix }: Props) {
  const target = typeof value === "number" ? value : parseFloat(String(value).replace(/[^\d.]/g, "")) || 0;
  const isNumeric = typeof value === "number" || /^\d+(\.\d+)?$/.test(String(value));
  const [display, setDisplay] = useState(isNumeric ? 0 : value);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!isNumeric) { setDisplay(value); return; }
    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = from + (to - from) * eased;
      setDisplay(Math.round(current));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, durationMs, isNumeric, value]);

  return (
    <span className={"manar-counter" + (className ? " " + className : "")}>
      {typeof display === "number" ? display.toLocaleString("en-US") : display}
      {suffix && <span className="counter-suffix">{suffix}</span>}
    </span>
  );
}
