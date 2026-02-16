import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMagic } from "./MagicContext";

const StepMagicNumber = () => {
  const { mode, getK, getX, nextStep, prevStep, setShowResult } = useMagic();
  const [revealed, setRevealed] = useState(false);
  const K = getK();
  const X = getX();

  const handleReveal = () => {
    setRevealed(true);
  };

  const handleNext = () => {
    setShowResult(true);
    nextStep();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="font-display text-xl md:text-2xl font-bold text-neon-gold text-glow-gold">
          第四步：神奇数字 K
        </h2>
        <p className="text-muted-foreground text-sm">
          {mode === "demo" ? "见证奇迹的时刻..." : "神奇数字 K 的真实来源"}
        </p>
      </div>

      {!revealed ? (
        <div className="flex justify-center">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Button
              onClick={handleReveal}
              className="px-10 py-5 font-display text-xl bg-gradient-to-r from-primary via-accent to-secondary text-primary-foreground hover:opacity-90"
            >
              <Sparkles className="w-6 h-6 mr-2" />
              揭晓神奇数字
            </Button>
          </motion.div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div className="space-y-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 10, duration: 0.8 }}
              className="glass-card rounded-xl p-8 max-w-md mx-auto text-center space-y-4"
            >
              <p className="text-sm text-muted-foreground">神奇数字 K</p>
              <div className="font-display text-5xl md:text-7xl font-bold text-neon-gold text-glow-gold">
                {K}
              </div>
            </motion.div>

            {mode === "decrypt" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-xl p-6 max-w-lg mx-auto space-y-4 border border-primary/30"
              >
                <div className="flex items-center gap-2 text-primary text-sm font-semibold">
                  <Eye className="w-4 h-4" />
                  解密：K 的真实来源
                </div>
                <div className="font-mono text-sm space-y-2">
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                    <span className="text-muted-foreground">你的数字 X = </span>
                    <span className="text-neon-gold">{X}</span>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
                    <span className="text-muted-foreground">K = X = </span>
                    <span className="text-neon-gold font-bold">{K}</span>
                  </motion.div>
                </div>
                <p className="text-xs text-muted-foreground border-t border-border pt-3">
                  💡 神奇数字 K 其实就是你输入的随机数 X 本身！魔术师早就知道你的"随机"输入了——因为 K 根本不需要提前知道，只需要在你输入后原样返回。
                </p>
              </motion.div>
            )}

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={prevStep} className="border-border">
                ← 返回
              </Button>
              <Button
                onClick={handleNext}
                className="px-8 font-display bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90"
              >
                ✨ 惊喜定格 ✨
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default StepMagicNumber;
