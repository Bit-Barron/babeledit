import { TreeNode } from "@/types/translation-editor.types";
import { create } from "zustand";

interface TranslationStore {
  approvedStates: Record<string, Record<string, boolean>>;
  setApprovedState: (nodeId: string, lang: string, approved: boolean) => void;

  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode | null) => void;
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

  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));
