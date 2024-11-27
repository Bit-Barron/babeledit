import { LanguageProps } from "@/@types/translation-editor.types";
import { create } from "zustand";

interface LanguageStore {
  languages: LanguageProps[];
  setLanguages: (languages: string[]) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  languages: [],
  setLanguages: (languages) =>
    set({
      languages: languages.map(
        (language) =>
          ({
            id: language,
            name: language,
          } as LanguageProps)
      ),
    }),
}));
