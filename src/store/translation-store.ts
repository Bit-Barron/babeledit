import { TreeNode } from "@/types/translation-editor.types";
import { create } from "zustand";

interface TranslationStore {
  approvedStates: Record<string, Record<string, boolean>>;
  setApprovedState: (nodeId: string, lang: string, approved: boolean) => void;

  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode | null) => void;
  translations: Record<string, string>;
  setTranslations: (translations: Record<string, string>) => void;
}

export const useTranslationStore = create<TranslationStore>((set) => ({
  approvedStates: {},
  setApprovedState: (nodeId, lang, approved) =>
    set((state) => ({
      approvedStates: {
        ...state.approvedStates,
        [nodeId]: {
          ...state.approvedStates[nodeId],
          [lang]: approved,
        },
      },
    })),
  translations: {},
  setTranslations: (translations) => set({ translations }),
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));
