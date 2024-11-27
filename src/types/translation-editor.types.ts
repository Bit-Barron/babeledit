export interface TreeNode {
  label: string;
  type: "folder" | "translation";
  children: TreeNode[];
  content?: Record<string, any>;
}
