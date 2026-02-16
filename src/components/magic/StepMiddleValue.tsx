import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMagic } from "./MagicContext";

const StepMiddleValue = () => {
  const { mode, getM, getT, getX, nextStep, prevStep } = useMagic();
  const [revealed, setRevealed] = useState(false);
  const M = getM();
  const T = getT();
  const X = getX();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="font-display text-xl md:text-2xl font-bold text-accent text-glow-pink">
          第三步：计算中间值 M
        </h2>
        <p className="text-muted-foreground text-sm">
          {mode === "demo" ? "通过神秘算法计算得出中间值..." : "中间值 M 的真实计算逻辑"}
        </p>
      </div>

      {!revealed ? (
        <div className="flex justify-center">
          <Button
            onClick={() => setRevealed(true)}
            className="px-8 py-4 font-display text-lg bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Calculator className="w-5 h-5 mr-2" />
            计算中间值
          </Button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className="space-y-6"
          >
            {/* Demo mode: just show M dramatically */}
            <div className="glass-card rounded-xl p-8 max-w-lg mx-auto text-center space-y-4">
              <p className="text-sm text-muted-foreground">中间值 M</p>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="font-display text-4xl md:text-6xl font-bold text-accent text-glow-pink"
              >
                {M}
              </motion.div>
            </div>

            {/* Decrypt mode: show formula */}
            {mode === "decrypt" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card rounded-xl p-6 max-w-lg mx-auto space-y-4 border border-primary/30"
              >
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  <Eye className="w-4 h-4" />
                  解密：真实计算逻辑
                </div>
                <div className="font-mono text-sm space-y-2">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                    <span className="text-muted-foreground">目标 T = </span>
                    <span className="text-secondary">{T}</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}>
                    <span className="text-muted-foreground">你的数字 X = </span>
                    <span className="text-neon-gold">{X}</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                    <span className="text-muted-foreground">M = T - X = </span>
                    <span className="text-secondary">{T}</span>
                    <span className="text-muted-foreground"> - </span>
                    <span className="text-neon-gold">{X}</span>
                    <span className="text-muted-foreground"> = </span>
                    <span className="text-accent font-bold">{M}</span>
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  💡 中间值 M 其实就是目标时间 T 减去你输入的随机数 X。这一步是整个魔术的核心——无论你输入什么，M 都会自动调整！
                </p>
              </motion.div>
            )}

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={prevStep} className="border-border">
                ← 返回
              </Button>
              <Button
                onClick={nextStep}
                className="px-8 font-display bg-accent text-accent-foreground hover:bg-accent/90"
              >
                揭晓神奇数字 →
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default StepMiddleValue;
