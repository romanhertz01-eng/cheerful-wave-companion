import { createContext, useContext, useMemo, type ReactNode } from "react";

export type CreditsState = {
  balance: number;
  periodGranted: number;
  periodSpent: number;
  isUnlimited: boolean;
  isLoading: boolean;
};

// TODO: источник истины — бэкенд, значения приходят после каждой генерации
const MOCK: CreditsState = {
  balance: 6240,
  periodGranted: 8000,
  periodSpent: 1760,
  isUnlimited: false,
  isLoading: false,
};

const CreditsContext = createContext<CreditsState>(MOCK);

export function CreditsProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => MOCK, []);
  return <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>;
}

export function useCredits() {
  return useContext(CreditsContext);
}

export function getCreditsMetrics(s: CreditsState) {
  const hasPeriod = !s.isUnlimited && s.periodGranted > 0;
  const usedPct = hasPeriod
    ? Math.max(0, Math.min(100, (s.periodSpent / s.periodGranted) * 100))
    : 0;
  const leftPct = hasPeriod ? 100 - usedPct : 0;
  return { hasPeriod, usedPct, leftPct };
}

export function ringColorClass(leftPct: number) {
  if (leftPct > 25) return "stroke-primary";
  if (leftPct > 10) return "stroke-amber-500";
  return "stroke-red-500";
}

export function barColorClass(leftPct: number) {
  if (leftPct > 25) return "bg-primary";
  if (leftPct > 10) return "bg-amber-500";
  return "bg-red-500";
}