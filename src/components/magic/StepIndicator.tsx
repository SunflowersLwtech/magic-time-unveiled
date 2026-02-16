import { motion } from "framer-motion";
import { useMagic } from "./MagicContext";

const steps = ["输入随机数", "时间锚定", "计算中间值", "神奇数字", "惊喜定格"];

const StepIndicator = () => {
  const { step } = useMagic();

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2">
      {steps.map((label, i) => (
        <div key={i} className="flex items-center gap-1 md:gap-2">
          <div className="flex flex-col items-center gap-1">
            <motion.div
              animate={{
                scale: step === i ? 1.2 : 1,
                backgroundColor:
                  step > i
                    ? "hsl(280 80% 65%)"
                    : step === i
                    ? "hsl(185 90% 55%)"
                    : "hsl(240 10% 18%)",
              }}
              className="w-3 h-3 md:w-4 md:h-4 rounded-full"
              style={step === i ? { boxShadow: "0 0 12px hsl(185 90% 55% / 0.6)" } : {}}
            />
            <span
              className={`text-[10px] md:text-xs hidden md:block ${
                step === i ? "text-secondary font-semibold" : "text-muted-foreground"
              }`}
            >
              {label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-6 md:w-12 h-px ${
                step > i ? "bg-primary" : "bg-border"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
