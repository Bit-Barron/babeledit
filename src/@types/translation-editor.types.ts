import { IconType } from "react-icons";

export interface TreeNode {
  label: string;
  type: NodeType;
  children?: TreeNode[];
}

export interface ProjectOption {
  title: string;
  Icon: IconType;
}

export interface TreeNodeProps {
  node: TreeNode;
  path: string;
  level: number;
  isExpanded: boolean;
  isSelected: boolean;
  onNodeClick: (node: TreeNode, path: string) => void;
  onMove: (dragPath: string, dropPath: string) => void;
}

export interface DragItem {
  path: string;
  type: NodeType;
}

type NodeType = "folder" | "translation";

export interface TranslationFile {
  name: string;
  content: Record<string, any>;
}
