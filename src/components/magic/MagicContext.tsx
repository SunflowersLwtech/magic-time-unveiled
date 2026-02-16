import React, { createContext, useContext, useState, useCallback } from "react";

export type MagicMode = "demo" | "decrypt";

interface MagicState {
  mode: MagicMode;
  setMode: (mode: MagicMode) => void;
  step: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  num4: string;
  setNum4: (v: string) => void;
  num5: string;
  setNum5: (v: string) => void;
  capturedTime: Date | null;
  setCapturedTime: (d: Date) => void;
  useCustomTarget: boolean;
  setUseCustomTarget: (v: boolean) => void;
  customTarget: string;
  setCustomTarget: (v: string) => void;
  showResult: boolean;
  setShowResult: (v: boolean) => void;
  getX: () => number;
  getT: () => number;
  getM: () => number;
  getK: () => number;
  reset: () => void;
}

const MagicContext = createContext<MagicState | null>(null);

export const useMagic = () => {
  const ctx = useContext(MagicContext);
  if (!ctx) throw new Error("useMagic must be used within MagicProvider");
  return ctx;
};

// Convert date to number string: MMDDHHmm (不含年份和秒)
function dateToString(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}`;
}

function dateToNumber(d: Date): number {
  return Number(dateToString(d));
}

function parseCustomTarget(s: string): number {
  // format: YYYY-MM-DD HH:mm:ss
  const d = new Date(s);
  if (isNaN(d.getTime())) return 0;
  return dateToNumber(d);
}

export const MagicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<MagicMode>("demo");
  const [step, setStep] = useState(0);
  const [num4, setNum4] = useState("");
  const [num5, setNum5] = useState("");
  const [capturedTime, setCapturedTime] = useState<Date | null>(null);
  const [useCustomTarget, setUseCustomTarget] = useState(false);
  const [customTarget, setCustomTarget] = useState("");
  const [showResult, setShowResult] = useState(false);

  const getX = useCallback(() => {
    return (parseInt(num4) || 0) + (parseInt(num5) || 0);
  }, [num4, num5]);

  const getT = useCallback(() => {
    if (useCustomTarget && customTarget) {
      return parseCustomTarget(customTarget);
    }
    if (capturedTime) {
      return dateToNumber(capturedTime);
    }
    return dateToNumber(new Date());
  }, [useCustomTarget, customTarget, capturedTime]);

  const getM = useCallback(() => {
    return getT() - getX();
  }, [getT, getX]);

  const getK = useCallback(() => {
    return getX();
  }, [getX]);

  const nextStep = useCallback(() => setStep(s => Math.min(s + 1, 4)), []);
  const prevStep = useCallback(() => setStep(s => Math.max(s - 1, 0)), []);

  const reset = useCallback(() => {
    setStep(0);
    setNum4("");
    setNum5("");
    setCapturedTime(null);
    setShowResult(false);
  }, []);

  return (
    <MagicContext.Provider
      value={{
        mode, setMode, step, setStep, nextStep, prevStep,
        num4, setNum4, num5, setNum5,
        capturedTime, setCapturedTime,
        useCustomTarget, setUseCustomTarget,
        customTarget, setCustomTarget,
        showResult, setShowResult,
        getX, getT, getM, getK, reset,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
};
