import { useState, useMemo } from "react";
import { produce } from "immer";

interface TreeNode {
  type: "folder" | "translation"; // Node can be either a folder or translation
  label: string; // Display name
  children?: TreeNode[]; // Subfolders/translations (only for folders)
  translationKey?: string; // Full path to translation value
}

export const useTranslationTree = (jsonContent: any) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(
    null
  );
  const [treeData, setTreeData] = useState<TreeNode[]>([]);

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

  useMemo(() => {
    setTreeData(createTreeFromJson(jsonContent || {}));
  }, [jsonContent]);

  const toggleNode = (path: string) => {
    setExpandedNodes((prev) => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const handleNodeClick = (node: TreeNode, path: string) => {
    if (node.type === "folder") {
      toggleNode(path);
    } else {
      setSelectedTranslation(path);
    }
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

  const moveNode = (dragPath: string, dropPath: string) => {
    if (dragPath === dropPath) return;

    if (dropPath.startsWith(dragPath + ".")) return;

    setTreeData(
      produce((draft: TreeNode[]) => {
        const dragPathParts = dragPath.split(".");
        const dropPathParts = dropPath.split(".");

        const draggedNode = findNodeByPath(draft, dragPathParts);
        if (!draggedNode) return;
        const dropNode = findNodeByPath(draft, dropPathParts);
        if (!dropNode) return;

        if (dropNode.type !== "folder") return;
        const removedNode = removeNodeByPath(draft, dragPathParts);
        if (!removedNode) return;

        if (!dropNode.children) {
          dropNode.children = [];
        }
        dropNode.children.push(removedNode);
      })
    );
  };

  const getNodePath = (node: TreeNode, parentPath = ""): string => {
    return parentPath ? `${parentPath}.${node.label}` : node.label;
  };

  return {
    treeData,
    expandedNodes,
    selectedTranslation,
    handleNodeClick,
    moveNode,
    getNodePath,
  };
};
