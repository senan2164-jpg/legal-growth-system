"use client";
import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Fait avancer une animation par étapes tant que son conteneur est visible.
 * L'étape reste figée hors écran : rien ne tourne pour rien.
 */
export function useSequence(count: number, { interval = 1600, hold = 2600, loop = true } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(count - 1);
      return;
    }
    const last = step === count - 1;
    if (last && !loop) return;
    const t = window.setTimeout(() => setStep(last ? 0 : step + 1), last ? hold : interval);
    return () => window.clearTimeout(t);
  }, [inView, step, count, interval, hold, loop]);

  return { ref, step, setStep, started };
}
