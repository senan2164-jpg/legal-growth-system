"use client";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PointerEvent, ReactNode } from "react";

const variants = {
  primary: "bg-champagne text-ink hover:bg-champagne-soft",
  ghostDark: "border border-ivory/20 text-ivory hover:border-ivory/50 hover:bg-ivory/[.04]",
  dark: "bg-ink text-ivory hover:bg-navy",
  ghostLight: "border border-ink/20 text-ink hover:border-ink/50",
} as const;

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  icon?: boolean;
};

export function MagneticLink({ href, children, variant = "primary", className = "", icon = true }: Props) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  function onMove(e: PointerEvent<HTMLAnchorElement>) {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.16);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  }

  return (
    <motion.a
      href={href}
      style={{ x: sx, y: sy }}
      onPointerMove={onMove}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`group inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </motion.a>
  );
}
