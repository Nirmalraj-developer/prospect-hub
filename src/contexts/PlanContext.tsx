import { createContext, useContext, useState, ReactNode } from 'react';
import { PlanTier } from '@/lib/plans';

interface PlanContextType {
  currentPlan: PlanTier;
  setCurrentPlan: (plan: PlanTier) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [currentPlan, setCurrentPlan] = useState<PlanTier>('trial');

  return (
    <PlanContext.Provider value={{ currentPlan, setCurrentPlan }}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within PlanProvider');
  }
  return context;
}
