import { motion } from "framer-motion";
import { Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMagic } from "./MagicContext";

const StepRandomInput = () => {
  const { num4, setNum4, num5, setNum5, nextStep, capturedTime, setCapturedTime } = useMagic();

  const randomDigits = (n: number) => {
    const min = Math.pow(10, n - 1);
    const max = Math.pow(10, n) - 1;
    return String(Math.floor(Math.random() * (max - min + 1)) + min);
  };

  const isValid = num4.length === 4 && num5.length === 5 && /^\d+$/.test(num4) && /^\d+$/.test(num5);

  const handleNext = () => {
    if (isValid) {
      setCapturedTime(new Date());
      nextStep();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <h2 className="font-display text-xl md:text-2xl font-bold text-primary text-glow-purple">
          第一步：输入随机数
        </h2>
        <p className="text-muted-foreground text-sm">
          请输入任意 4 位数和 5 位数，或点击骰子随机生成
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        {/* 4-digit input */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">4 位随机数</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={num4}
              onChange={(e) => setNum4(e.target.value.replace(/\D/g, "").slice(0, 4))}
              placeholder="1234"
              className="w-36 h-14 text-center font-display text-2xl font-bold bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 neon-border"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNum4(randomDigits(4))}
              className="h-14 w-14 border-border hover:bg-primary/10"
            >
              <Dices className="w-5 h-5 text-primary" />
            </Button>
          </div>
          {num4.length > 0 && num4.length < 4 && (
            <p className="text-xs text-accent">请输入 4 位数字</p>
          )}
        </div>

        <span className="text-2xl text-muted-foreground font-display">+</span>

        {/* 5-digit input */}
        <div className="space-y-2">
          <label className="text-sm text-muted-foreground">5 位随机数</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              inputMode="numeric"
              maxLength={5}
              value={num5}
              onChange={(e) => setNum5(e.target.value.replace(/\D/g, "").slice(0, 5))}
              placeholder="56789"
              className="w-44 h-14 text-center font-display text-2xl font-bold bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 neon-border"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setNum5(randomDigits(5))}
              className="h-14 w-14 border-border hover:bg-primary/10"
            >
              <Dices className="w-5 h-5 text-primary" />
            </Button>
          </div>
          {num5.length > 0 && num5.length < 5 && (
            <p className="text-xs text-accent">请输入 5 位数字</p>
          )}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleNext}
          disabled={!isValid}
          className="px-8 py-3 font-display text-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-30"
        >
          锁定数字 →
        </Button>
      </div>
    </motion.div>
  );
};

export default StepRandomInput;
