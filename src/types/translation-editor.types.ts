// translation editor types

export interface TreeNode {
  label: string;
  type: "folder" | "translation";
  children: TreeNode[];
  content?: Record<string, any>;
}

export interface FileContent {
  name: string;
  content: string;
}

export interface LanguageProps {
  id: string;
  name: string;
}

export interface PlaceholderPart {
  type: "placeholder" | "text";
  content: string;
}
