import { motion } from "framer-motion";
import { Eye, Wand2 } from "lucide-react";
import { useMagic } from "./MagicContext";

const ModeToggle = () => {
  const { mode, setMode } = useMagic();

  return (
    <div className="flex items-center gap-1 p-1 rounded-full bg-muted border border-border">
      <button
        onClick={() => setMode("demo")}
        className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
      >
        {mode === "demo" && (
          <motion.div
            layoutId="mode-bg"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        )}
        <span className={`relative flex items-center gap-1.5 ${mode === "demo" ? "text-primary-foreground" : "text-muted-foreground"}`}>
          <Wand2 className="w-3.5 h-3.5" />
          演示模式
        </span>
      </button>
      <button
        onClick={() => setMode("decrypt")}
        className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors"
      >
        {mode === "decrypt" && (
          <motion.div
            layoutId="mode-bg"
            className="absolute inset-0 rounded-full bg-primary"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          />
        )}
        <span className={`relative flex items-center gap-1.5 ${mode === "decrypt" ? "text-primary-foreground" : "text-muted-foreground"}`}>
          <Eye className="w-3.5 h-3.5" />
          解密模式
        </span>
      </button>
    </div>
  );
};

export default ModeToggle;
