import { LanguageProps } from "@/types/translation-editor.types";
import { create } from "zustand";

interface LanguageStore {
  languages: LanguageProps[];
  setLanguages: (languages: string[]) => void;
  addLanguage: (language: string) => void;
  removeLanguage: (languageId: string) => void;
  clearLanguages: () => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  languages: [],

  setLanguages: (languages) =>
    set({
      languages: languages.map((language) => ({
        id: language,
        name: language,
      })),
    }),

  addLanguage: (language) =>
    set((state) => {
      // Check if language already exists
      if (state.languages.some((lang) => lang.id === language)) {
        return state;
      }

      return {
        languages: [
          ...state.languages,
          {
            id: language,
            name: language,
          },
        ],
      };
    }),

  removeLanguage: (languageId) =>
    set((state) => ({
      languages: state.languages.filter((lang) => lang.id !== languageId),
    })),

  clearLanguages: () => set({ languages: [] }),
}));
