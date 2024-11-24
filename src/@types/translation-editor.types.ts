import { IconType } from "react-icons";

export interface TreeNode {
  label: string;
  type: NodeType;
  children?: TreeNode[];
  content?: string;
}

export interface ProjectOption {
  title: string;
  Icon: IconType;
}

export type NodeType = "folder" | "translation";

export interface TranslationFile {
  name: string;
  content: Record<string, any>;
}

export interface LanguageFile {
  name: string;
}

export interface LocationState {
  files: LanguageFile[];
}
