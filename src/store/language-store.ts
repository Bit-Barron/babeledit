import { create } from "zustand";

interface LanguageProps {
  name: string;
  id: string;
}

interface LanguageStore {
  languages: LanguageProps[];
  setLanguages: (languages: string[]) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  languages: [],
  setLanguages: (languages) =>
    set({
      languages: languages.map((lang) => ({ name: lang, id: lang })),
    }),
}));
