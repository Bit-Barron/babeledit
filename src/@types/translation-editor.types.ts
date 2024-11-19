interface TreeNode {
  type: "folder" | "translation";
  label: string;
  children?: TreeNode[];
  translationKey?: string;
}
