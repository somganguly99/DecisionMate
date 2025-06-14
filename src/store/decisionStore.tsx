import { create } from 'zustand';

export type Option = {
  text: string;
  shortTerm: { text: string; weight: number }[];
  longTerm: { text: string; weight: number }[];
  risks: { text: string; weight: number }[];
};

interface DecisionState {
  decision: string;
  importance: string;
  urgency: number;
  options: Option[];
  setDecision: (decision: string) => void;
  setImportance: (importance: string) => void;
  setUrgency: (urgency: number) => void;
  setOptions: (options: string[]) => void;
  updateOption: (index: number, updates: Partial<Option>) => void;
}

export const useDecisionStore = create<DecisionState>((set) => ({
  decision: '',
  importance: '',
  urgency: 3,
  options: [],
  setDecision: (decision) => set({ decision }),
  setImportance: (importance) => set({ importance }),
  setUrgency: (urgency) => set({ urgency }),
  setOptions: (options) => set({ 
    options: options.map(text => ({
      text,
      shortTerm: [{ text: '', weight: 3 }],
      longTerm: [{ text: '', weight: 3 }],
      risks: [{ text: '', weight: 3 }]
    }))
  }),
  updateOption: (index, updates) => set((state) => {
    const newOptions = [...state.options];
    newOptions[index] = { ...newOptions[index], ...updates };
    return { options: newOptions };
  }),
}));
