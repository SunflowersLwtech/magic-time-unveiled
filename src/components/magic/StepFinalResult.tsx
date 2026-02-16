import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PartyPopper, Eye, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMagic } from "./MagicContext";

// Simple particle effect
const Particles = () => {
  const colors = [
    "hsl(280 80% 65%)",
    "hsl(185 90% 55%)",
    "hsl(320 85% 60%)",
    "hsl(45 90% 60%)",
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: "50%",
            y: "50%",
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: "easeOut",
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{ backgroundColor: colors[i % colors.length] }}
        />
      ))}
    </div>
  );
};

const StepFinalResult = () => {
  const { mode, getM, getK, getT, reset } = useMagic();
  const [showParticles, setShowParticles] = useState(true);
  const M = getM();
  const K = getK();
  const T = getT();
  const result = M + K;

  useEffect(() => {
    const timer = setTimeout(() => setShowParticles(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 relative"
    >
      {showParticles && <Particles />}

      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 10 }}
        >
          <PartyPopper className="w-12 h-12 text-neon-gold mx-auto mb-4" />
        </motion.div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-purple">
          惊喜定格！
        </h2>
      </div>

      {/* Calculation display */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring" }}
        className="glass-card rounded-2xl p-8 max-w-md mx-auto text-center space-y-6"
      >
        <div className="flex items-center justify-center gap-4 font-display text-2xl md:text-3xl">
          <span className="text-accent">{M}</span>
          <span className="text-muted-foreground">+</span>
          <span className="text-neon-gold">{K}</span>
          <span className="text-muted-foreground">=</span>
        </div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, type: "spring", damping: 8 }}
          className="font-display text-5xl md:text-7xl font-black text-secondary text-glow-cyan"
        >
          {result}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-2"
        >
          <p className="text-sm text-muted-foreground">目标时间 T</p>
          <p className="font-display text-3xl font-bold text-secondary">{T}</p>
          {result === T && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="text-primary font-bold font-display text-lg"
            >
              ✅ 时间定格成功！M + K = T
            </motion.p>
          )}
        </motion.div>
      </motion.div>

      {/* Decrypt mode: full formula breakdown */}
      {mode === "decrypt" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="glass-card rounded-xl p-6 max-w-xl mx-auto space-y-4 border border-primary/30"
        >
          <div className="flex items-center gap-2 text-primary text-sm font-semibold">
            <Eye className="w-4 h-4" />
            解密：变量抵消恒等式
          </div>
          <div className="font-mono text-sm space-y-3">
            <div>
              <span className="text-muted-foreground">M + K</span>
            </div>
            <div>
              <span className="text-muted-foreground">= </span>
              <span className="text-accent">(T - X)</span>
              <span className="text-muted-foreground"> + </span>
              <span className="text-neon-gold">(X)</span>
            </div>
            <div>
              <span className="text-muted-foreground">= T - </span>
              <span className="text-neon-gold line-through">X</span>
              <span className="text-muted-foreground"> + </span>
              <span className="text-neon-gold line-through">X</span>
            </div>
            <div className="text-lg font-bold">
              <span className="text-muted-foreground">= </span>
              <span className="text-secondary">T</span>
            </div>
          </div>
          <div className="border-t border-border pt-3 space-y-2">
            <p className="text-xs text-muted-foreground">
              🎯 <strong className="text-foreground">核心原理</strong>：无论你输入什么随机数 X，X 在加减中完美抵消，最终结果恒等于目标时间 T。
            </p>
            <p className="text-xs text-muted-foreground">
              💡 <strong className="text-foreground">生活类比</strong>：就像你去商店买了 X 元的东西，付了 T 元，找回 (T-X) 元。把找零和花的钱加起来：(T-X)+X = T，总金额永远不变！
            </p>
          </div>
        </motion.div>
      )}

      <div className="flex justify-center">
        <Button onClick={reset} variant="outline" className="px-8 border-border">
          <RotateCcw className="w-4 h-4 mr-2" />
          重新开始
        </Button>
      </div>
    </motion.div>
  );
};

export default StepFinalResult;
