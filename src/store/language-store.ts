import { create } from "zustand";

interface LanguageStore {
  languages: string[];
  setLanguages: (languages: string[]) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  languages: [],
  setLanguages: (languages) => set({ languages }),
}));
