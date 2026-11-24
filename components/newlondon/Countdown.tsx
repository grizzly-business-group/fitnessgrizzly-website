"use client";
import { useEffect, useState } from "react";

/** Live countdown to the founders presale (newLondon.founders.presaleAt). Shows "Presale is live" once it passes. */
export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setNow(Date.now());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);
  const left = now === null ? null : Math.max(0, target - now);
  if (left === 0) return <p className="nl-live"><i className="nl-dot" />Presale is live</p>;
  const parts = left === null ? ["--", "--", "--", "--"] : [864e5, 36e5, 6e4, 1e3].map((u, i) => {
    const v = i === 0 ? Math.floor(left / u) : Math.floor(left / u) % (i === 1 ? 24 : 60);
    return String(v).padStart(2, "0");
  });
  return (
    <div className="nl-cd" role="timer" aria-label="Time until the founders presale opens">
      {["Days", "Hrs", "Min", "Sec"].map((l, i) => (
        <div key={l}>
          <b>{parts[i]}</b>
          {l}
        </div>
      ))}
    </div>
  );
}
