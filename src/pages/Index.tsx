import { AnimatePresence } from "framer-motion";
import { MagicProvider, useMagic } from "@/components/magic/MagicContext";
import ModeToggle from "@/components/magic/ModeToggle";
import StepIndicator from "@/components/magic/StepIndicator";
import LiveClock from "@/components/magic/LiveClock";
import StepRandomInput from "@/components/magic/StepRandomInput";
import StepTimeCapture from "@/components/magic/StepTimeCapture";
import StepMiddleValue from "@/components/magic/StepMiddleValue";
import StepMagicNumber from "@/components/magic/StepMagicNumber";
import StepFinalResult from "@/components/magic/StepFinalResult";

const MagicApp = () => {
  const { step } = useMagic();

  const steps = [
    <StepRandomInput key="s0" />,
    <StepTimeCapture key="s1" />,
    <StepMiddleValue key="s2" />,
    <StepMagicNumber key="s3" />,
    <StepFinalResult key="s4" />,
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--gradient-dark)" }}>
      {/* Background ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "hsl(280 80% 65%)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
          style={{ background: "hsl(185 90% 55%)" }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 pt-6 pb-4 px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-primary text-glow-purple tracking-wider">
              惊喜定格
            </h1>
            <ModeToggle />
          </div>
          <LiveClock />
          <StepIndicator />
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            {steps[step]}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-4 text-xs text-muted-foreground">
        2026 春晚《惊喜定格》魔术原理可视化 · 邓男子
      </footer>
    </div>
  );
};

const Index = () => (
  <MagicProvider>
    <MagicApp />
  </MagicProvider>
);

export default Index;
