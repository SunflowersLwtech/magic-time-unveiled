import { motion } from "framer-motion";
import { Clock, Calendar, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMagic } from "./MagicContext";

const StepTimeCapture = () => {
  const {
    capturedTime, nextStep, prevStep,
    useCustomTarget, setUseCustomTarget,
    customTarget, setCustomTarget,
  } = useMagic();

  const pad = (n: number) => String(n).padStart(2, "0");

  const formatTime = (d: Date) => {
    const p = (n: number) => String(n).padStart(2, "0");
    const numStr = `${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}`;
    return {
      date: `${p(d.getMonth() + 1)}月${p(d.getDate())}日`,
      time: `${p(d.getHours())}:${p(d.getMinutes())}`,
      numStr,
    };
  };

  const ct = capturedTime ? formatTime(capturedTime) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="font-display text-xl md:text-2xl font-bold text-secondary text-glow-cyan">
          第二步：时间锚定
        </h2>
        <p className="text-muted-foreground text-sm">
          时间已在你按下按钮的瞬间被捕获
        </p>
      </div>

      {ct && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 15 }}
          className="glass-card rounded-xl p-6 md:p-8 max-w-md mx-auto text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="font-display text-lg text-foreground">{ct.date}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            <span className="font-display text-3xl md:text-5xl font-bold text-secondary text-glow-cyan">
              {ct.time}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            时间数值 T = <span className="text-foreground font-mono font-bold">{ct.numStr}</span>
          </div>
        </motion.div>
      )}

      {/* Custom target option */}
      <div className="max-w-md mx-auto space-y-3">
        <button
          onClick={() => setUseCustomTarget(!useCustomTarget)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mx-auto"
        >
          <Edit3 className="w-4 h-4" />
          {useCustomTarget ? "使用捕获时间" : "自定义目标时间 T"}
        </button>
        
        {useCustomTarget && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="space-y-2"
          >
            <input
              type="datetime-local"
              value={customTarget}
              onChange={(e) => setCustomTarget(e.target.value)}
              className="w-full h-12 px-4 font-mono bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <p className="text-xs text-muted-foreground text-center">
              输入生日、纪念日等任意时间作为目标
            </p>
          </motion.div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <Button variant="outline" onClick={prevStep} className="border-border">
          ← 返回
        </Button>
        <Button
          onClick={nextStep}
          className="px-8 font-display bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          下一步 →
        </Button>
      </div>
    </motion.div>
  );
};

export default StepTimeCapture;
