import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LiveClock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const parts = [
    { label: "年", value: String(now.getFullYear()) },
    { label: "月", value: pad(now.getMonth() + 1) },
    { label: "日", value: pad(now.getDate()) },
    { label: "时", value: pad(now.getHours()) },
    { label: "分", value: pad(now.getMinutes()) },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
      {parts.map((p, i) => (
        <div key={p.label} className="flex items-baseline gap-0.5">
          <div className="flex">
            {p.value.split("").map((digit, di) => (
              <AnimatePresence mode="popLayout" key={di}>
                <motion.span
                  key={digit + di}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-block font-display text-3xl md:text-5xl font-black italic tracking-wider bg-gradient-to-br from-secondary via-primary to-accent bg-clip-text text-transparent text-glow-cyan drop-shadow-[0_0_12px_hsl(var(--neon-cyan)/0.6)]"
                >
                  {digit}
                </motion.span>
              </AnimatePresence>
            ))}
          </div>
          <span className="text-[10px] md:text-xs text-muted-foreground">{p.label}</span>
          {i === 2 && <span className="mx-1 md:mx-2 text-muted-foreground">|</span>}
        </div>
      ))}
    </div>
  );
};

export default LiveClock;
