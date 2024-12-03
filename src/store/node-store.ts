import { TreeNode } from "@/types/translation-editor.types";
import { create } from "zustand";

interface NodeContentStore {
  selectedNode: TreeNode | null;
  setSelectedNode: (node: TreeNode | null) => void;
}

export const useNodeContentStore = create<NodeContentStore>((set) => ({
  selectedNode: null,
  setSelectedNode: (node) => set({ selectedNode: node }),
}));
