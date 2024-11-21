import { create } from "zustand";
import { produce } from "immer";
import { enableMapSet } from "immer";

enableMapSet();

interface TreeNode {
  type: "folder" | "translation";
  label: string;
  children?: TreeNode[];
  translationKey?: string;
}

interface TranslationState {
  treeData: TreeNode[];
  expandedNodes: Set<string>;
  selectedTranslation: string | null;
  jsonContent: any;

  setJsonContent: (content: any) => void;
  handleNodeClick: (node: TreeNode, path: string) => void;
  moveNode: (dragPath: string, dropPath: string) => void;
  getNodePath: (node: TreeNode, parentPath?: string) => string;
}

const createTreeFromJson = (obj: any, parentPath = ""): TreeNode[] => {
  return Object.entries(obj).map(([key, value]) => {
    const currentPath = parentPath ? `${parentPath}.${key}` : key;
    if (value && typeof value === "object") {
      return {
        type: "folder",
        label: key,
        children: createTreeFromJson(value, currentPath),
      };
    }
    return {
      type: "translation",
      label: key,
      translationKey: currentPath,
    };
  });
};

const findNodeByPath = (
  nodes: TreeNode[],
  pathParts: string[]
): TreeNode | null => {
  const [current, ...rest] = pathParts;
  const node = nodes.find((n) => n.label === current);

  if (!node) return null;
  if (rest.length === 0) return node;
  if (node.type === "folder" && node.children) {
    return findNodeByPath(node.children, rest);
  }
  return null;
};

const removeNodeByPath = (
  nodes: TreeNode[],
  pathParts: string[]
): TreeNode | null => {
  const [current, ...rest] = pathParts;
  const index = nodes.findIndex((n) => n.label === current);

  if (index === -1) return null;
  if (rest.length === 0) {
    const [removed] = nodes.splice(index, 1);
    return removed;
  }
  const node = nodes[index];
  if (node.type === "folder" && node.children) {
    const removed = removeNodeByPath(node.children, rest);
    if (node.children.length === 0) {
      nodes.splice(index, 1);
    }
    return removed;
  }
  return null;
};

export const useTranslationStore = create<TranslationState>()((set) => ({
  treeData: [],
  expandedNodes: new Set<string>(),
  selectedTranslation: null,
  jsonContent: null,

  setJsonContent: (content: any) => {
    set({
      jsonContent: content,
      treeData: createTreeFromJson(content || {}),
    });
  },

  handleNodeClick: (node: TreeNode, path: string) => {
    if (node.type === "folder") {
      set(
        produce((state: TranslationState) => {
          const newExpandedNodes = new Set(state.expandedNodes);
          if (newExpandedNodes.has(path)) {
            newExpandedNodes.delete(path);
          } else {
            newExpandedNodes.add(path);
          }
          state.expandedNodes = newExpandedNodes;
        })
      );
    } else {
      set({ selectedTranslation: path });
    }
  },

  moveNode: (dragPath: string, dropPath: string) => {
    if (dragPath === dropPath) return;
    if (dropPath.startsWith(dragPath + ".")) return;

    set(
      produce((state: TranslationState) => {
        const dragPathParts = dragPath.split(".");
        const dropPathParts = dropPath.split(".");

        const draggedNode = findNodeByPath(state.treeData, dragPathParts);
        if (!draggedNode) return;

        const dropNode = findNodeByPath(state.treeData, dropPathParts);
        if (!dropNode || dropNode.type !== "folder") return;

        const removedNode = removeNodeByPath(state.treeData, dragPathParts);
        if (!removedNode) return;

        if (!dropNode.children) {
          dropNode.children = [];
        }
        dropNode.children.push(removedNode);
      })
    );
  },

  getNodePath: (node: TreeNode, parentPath = ""): string => {
    return parentPath ? `${parentPath}.${node.label}` : node.label;
  },
}));

export default useTranslationStore;
