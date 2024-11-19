import { useState, useMemo } from "react";

export const useTranslationTree = (jsonContent: any) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedTranslation, setSelectedTranslation] = useState<string | null>(
    null
  );

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

  const treeData = useMemo(() => {
    return createTreeFromJson(jsonContent || {});
  }, [jsonContent]);

  return {
    treeData,
    expandedNodes,
    selectedTranslation,
    handleNodeClick,
  };
};
